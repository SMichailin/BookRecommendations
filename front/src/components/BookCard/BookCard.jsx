import './BookCard.css';

const BookCard = ({ title, description, img, onClick, onEdit, onDelete }) => {
  return (
    <div className="book-card">
      <img src={img} alt={title} onClick={onClick} className="book-card-image" />
      <div className="book-card-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="book-card-actions">
          {onEdit && (
            <button onClick={onEdit} className="edit-button">Edit</button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="delete-button">Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
