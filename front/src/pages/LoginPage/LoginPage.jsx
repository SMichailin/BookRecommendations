import { useState } from 'react';
import './Loginpage.css';
import { loginUser } from '../../Services/Loginservice';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUser(formData);
      console.log('Token:', token); // Log the token to the console
      login(token); 
      setSuccess('User logged in successfully');
      setError('');
    } catch (err) {
      setError('Login failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
