import { useState, useEffect } from 'react';
import './HomePage.css';
import BookCard from '../../components/BookCard/BookCard';
import { fetchBooks } from '../../Services/BookService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
        setFilteredBooks(booksData);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      }
    };

    loadBooks();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(term) ||
        book.description.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
      );
      setFilteredBooks(filtered);
    }
  };

  const handleCardClick = (book) => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Book Recommendations</h1>
      <p>This is the best place to find and share book recommendations.</p>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="book-cards-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              description={book.description}
              img={book.img}
              onClick={() => handleCardClick(book)}
            />
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
