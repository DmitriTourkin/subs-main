import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Main from './components/Main';
import UsersSubs from './components/UsersSubs';
import AddSubscription from './components/AddSubscription';
import Login from './components/Login';
import Register from './components/Register';
import SubDetail from './components/SubDetail';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav className="navigation-bar">
          <ul className='navigation-bar-list'>
            <li className='navigation-item'>
              <NavLink to="/" activeClassName="active">Основная</NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li className='navigation-item'>
                  <NavLink to="/subscription" activeClassName="active">Мои подписки</NavLink>
                </li>
                <li className='navigation-item'>
                  <NavLink to="/add-subscription" activeClassName="active">Добавить подписку</NavLink>
                </li>

              </>
            )}
            {isLoggedIn ? (
              <>
                <li className="navigation-item">
                  <NavLink to="/exit" onClick={handleLogout}>Выход</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className='navigation-item'>
                  <NavLink to="/login" activeClassName="active">Вход</NavLink>
                </li>
                <li className='navigation-item'>
                  <NavLink to="/register" activeClassName="active">Регистрация</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Main />} />
          {isLoggedIn ? (
            <>
              <Route path="/subscription" element={<UsersSubs />} />
              <Route path="/add-subscription" element={<AddSubscription />} />
              <Route path="/subscription/:id" element={<SubDetail />} />
            </>
          ) : (
            <>
              <Route path="/subscription" element={<Navigate to="/login" />} />
              <Route path="/add-subscription" element={<Navigate to="/login" />} />
              <Route path="/subscription/:id" element={<SubDetail />} />
            </>
          )}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exit" element={<Logout onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
}


function Logout({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <div>Выход выполнен успешно</div>;
}

export default App;

