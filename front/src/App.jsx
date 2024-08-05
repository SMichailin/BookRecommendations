
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage';
import AddBookPage from './pages/AddBoookPage/AddBookPage';
import AddGenrePage from './pages/AddGenrePage/AddGenrePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/add-genre" element={<AddGenrePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
