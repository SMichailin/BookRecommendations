import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../../Services/BookService';
import './BookDetailPage.css';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBook = async () => {
      try {
        const booksData = await fetchBooks();
        const selectedBook = booksData.find((b) => b.id === parseInt(id, 10));
        setBook(selectedBook);
      } catch (err) {
        setError('Failed to fetch book details.');
        console.error(err);
      }
    };

    loadBook();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail-page">
      <h2>{book.title}</h2>
      <img src={book.img} alt={book.title} />
      <p>{book.description}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Number of Pages:</strong> {book.numOfPage}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
    </div>
  );
};

export default BookDetailPage;
