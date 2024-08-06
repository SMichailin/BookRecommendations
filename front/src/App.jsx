import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import AuthProvider from './context/AuthContext'; // Correct import
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import AddGenrePage from './pages/AddGenrePage/AddGenrePage';
import AddBookPage from './pages/AddBoookPage/AddBookPage'
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes> {/* Changed Switch to Routes */}
          <Route path="/" element={<HomePage />} /> {/* Changed component to element */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-genre" element={<AddGenrePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
