import { useState, useEffect } from 'react';
import './ManageGenresPage.css';
import { fetchGenres, updateGenre, deleteGenre } from '../../Services/GenreService';

const ManageGenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [editGenreId, setEditGenreId] = useState(null);
  const [newGenreName, setNewGenreName] = useState('');

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (err) {
        setError('Failed to fetch genres.');
        console.error(err);
      }
    };

    loadGenres();
  }, []);

  const handleEdit = (genre) => {
    setEditGenreId(genre.id);
    setNewGenreName(genre.name);
  };

  const handleUpdate = async (id) => {
    try {
      await updateGenre(id, newGenreName);
      setGenres(genres.map(genre => genre.id === id ? { ...genre, name: newGenreName } : genre));
      setEditGenreId(null);
    } catch (err) {
      setError('Failed to update genre.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGenre(id);
      setGenres(genres.filter(genre => genre.id !== id));
    } catch (err) {
      setError('Failed to delete genre.');
      console.error(err);
    }
  };

  return (
    <div className="manage-genres-container">
      <h1>Manage Genres</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="genres-list">
        {genres.map((genre) => (
          <li key={genre.id} className="genre-item">
            {editGenreId === genre.id ? (
              <div className="edit-genre">
                <input
                  type="text"
                  value={newGenreName}
                  onChange={(e) => setNewGenreName(e.target.value)}
                />
                <button onClick={() => handleUpdate(genre.id)}>Update</button>
                <button onClick={() => setEditGenreId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="genre-info">
                <span>{genre.name}</span>
                <button onClick={() => handleEdit(genre)}>Edit</button>
                <button onClick={() => handleDelete(genre.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageGenresPage;
