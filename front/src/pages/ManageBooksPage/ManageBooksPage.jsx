import { useState, useEffect } from 'react';
import './ManageBooksPage.css';
import BookCard from '../../components/BookCard/BookCard';
import BookDetail from '../../components/BookDetails/BookDetailsPage';
import { fetchBooks, addBook, updateBook, deleteBook } from '../../Services/BookService';
import { fetchGenres } from '../../Services/FetchGenres';

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isbn: '',
    img: '',
    numOfPage: '',
    genre: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editBookId, setEditBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      }
    };

    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (err) {
        console.error('Failed to fetch genres', err);
      }
    };

    loadBooks();
    loadGenres();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const newBook = await addBook(formData);
      setBooks([...books, newBook]);
      setSuccess('Book added successfully');
      setError('');
      setFormData({
        title: '',
        description: '',
        isbn: '',
        img: '',
        numOfPage: '',
        genre: ''
      });
    } catch (err) {
      setError('Adding book failed. Please try again.');
      setSuccess('');
    }
  };

  const handleEdit = (book) => {
    setEditBookId(book.id);
    setFormData({
      title: book.title,
      description: book.description,
      isbn: book.isbn,
      img: book.img,
      numOfPage: book.numOfPage,
      genre: book.genre
    });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    try {
      await updateBook(editBookId, formData);
      setBooks(books.map(book => book.id === editBookId ? { ...book, ...formData } : book));
      setSuccess('Book updated successfully');
      setError('');
      setEditBookId(null);
      setFormData({
        title: '',
        description: '',
        isbn: '',
        img: '',
        numOfPage: '',
        genre: ''
      });
    } catch (err) {
      setError('Updating book failed. Please try again.');
      setSuccess('');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
      setSuccess('Book deleted successfully');
      setError('');
    } catch (err) {
      setError('Deleting book failed. Please try again.');
      setSuccess('');
    }
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };
  
  

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  return (
    <div className="manage-books-container">
      <h2>Manage Books</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={editBookId ? handleUpdateBook : handleAddBook} className="manage-books-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numOfPage">Number of Pages</label>
          <input
            type="number"
            id="numOfPage"
            name="numOfPage"
            value={formData.numOfPage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">{editBookId ? 'Update Book' : 'Add Book'}</button>
      </form>
      {books.length > 0 ? (
        <div className="book-cards-container">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              description={book.description}
              img={book.img}
              onClick={() => handleCardClick(book)}
              onEdit={() => handleEdit(book)}
              onDelete={() => handleDeleteBook(book.id)}
            />
          ))}
        </div>
      ) : (
        <div>No books available.</div>
      )}
      {selectedBook && <BookDetail book={selectedBook} onClose={handleCloseDetail} />}
    </div>
  );
};

export default ManageBooksPage;
