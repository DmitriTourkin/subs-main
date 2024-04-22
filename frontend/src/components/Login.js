import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './Register.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null); // State to store user ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/users/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const user = response.data.find(user => user.username === formData.username);
      setUserData(user);
      setUserId(user.id); // Set user ID from fetched user data
      localStorage.setItem('userId', user.id); // Save userId in localStorage
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/token/login/', {
        username: formData.username,
        password: formData.password
      });
      const token = response.data.auth_token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      onLogin();
    } catch (error) {
      setError('Неверные учетные данные. Пожалуйста, попробуйте снова.');
      console.error('Authentication failed:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  if (isLoggedIn && userData) {
    return (
      <div className="register-container">
        <h2>Ваш ID пользователя: {userId}</h2>
        <Navigate to={`/subscription`} />
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Имя пользователя:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Пароль:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;



