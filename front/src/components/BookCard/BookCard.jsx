
import './BookCard.css';

const BookCard = ({ title, description, img }) => {
  return (
    <div className="book-card">
      <img src={img} alt={title} className="book-card-img" />
      <div className="book-card-content">
        <h2 className="book-card-title">{title}</h2>
        <p className="book-card-description">{description}</p>
      </div>
    </div>
  );
};

export default BookCard;
