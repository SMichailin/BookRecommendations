import { useState, useEffect } from 'react';
import './AddBookPage.css';
import { addBook } from '../../Services/BookService'
import { getGenres } from '../../Services/GenreService';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isbn: '',
    img: '',
    numOfPage: '',
    genre: ''
  });

  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getGenres();
        setGenres(genres);
      } catch (err) {
        console.error('Failed to fetch genres', err);
      }
    };

    fetchGenres();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBook(formData);
      setSuccess('Book added successfully');
      setError('');
    } catch (err) {
      setError('Adding book failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="add-book-form">
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
        <button type="submit" className="submit-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
