import { useState, useEffect } from 'react';
import './HomePage.css';
import BookCard from '../../components/BookCard/BookCard';
import { fetchBooks } from '../../Services/BookService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    loadBooks();
  }, []);

  const handleCardClick = (book) => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Book Recommendations</h1>
      <p>This is the best place to find and share book recommendations.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="book-cards-container">
        {books.length > 0 ? (
          books.map((book) => (
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
