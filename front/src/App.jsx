import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; 
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import AddGenrePage from './pages/AddGenrePage/AddGenrePage';
import AddBookPage from './pages/AddBoookPage/AddBookPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ManageGenresPage from './pages/ManageGenresPage/ManageGenresPage';
import ManageBooksPage from './pages/ManageBooksPage/ManageBooksPage';
import BookDetailPage from './components/BookDetails/BookDetailsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-genre" element={<AddGenrePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/manage-genres" element={<ManageGenresPage />} />
          <Route path="/manage-books" element={<ManageBooksPage />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
