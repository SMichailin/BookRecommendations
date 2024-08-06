import { useState, useEffect } from 'react';
import './AddGenrePage.css';
import { addGenre } from '../../Services/GenreService';
import { getUserRole } from '../../Services/UserService';

const AddGenrePage = () => {
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const role = await getUserRole(token);
          console.log('User role:', role); // Log the user role
          setIsAdmin(role === 'ROLE_ADMIN');
        } catch (error) {
          console.error('Failed to fetch user role:', error);
        }
      }
    };
    checkAdmin();
  }, []);

  const handleChange = (e) => {
    setGenre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addGenre({ name: genre });
      setSuccess('Genre added successfully');
      setError('');
    } catch (err) {
      setError('Adding genre failed. Please try again.');
      setSuccess('');
    }
  };

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="add-genre-container">
      <h2>Add a New Genre</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <form onSubmit={handleSubmit} className="add-genre-form">
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Genre</button>
      </form>
    </div>
  );
};

export default AddGenrePage;
