import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './UsersSubs.css';
import {Link} from "react-router-dom";

const UsersSubs = () => {
  const [userId, setUserId] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [categories, setCategories] = useState([]);

  const cachedSubscriptions = useMemo(() => {
    return subscriptions;
  }, [subscriptions]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchSubscriptions(storedUserId);
    }
  }, []);

  const fetchSubscriptions = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/subscription/?author=${userId}`);
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '/');
  };

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-content">
        <div className='section-title-area'>
          <h2 className='section-main-title'>Все подписки ({subscriptions.length})</h2>
          <Link to={'/add-subscription'}>
            <button className='add-sub-button'></button>
          </Link>
        </div>
        <ul className="subscriptions-container">
          {subscriptions.map(subscription => (
            <li key={subscription.id} className="subscription-list-item">
              <Link to={`/subscription/${subscription.id}`} className="card-link">
                <div className="subscription-card">
                  <h2 className='sub-name'>{subscription.name}</h2>
                  <div className="subs-details">
                    <p className="sub-parameters"><span className='par-title'>Цена: </span> {subscription.price} рублей</p>
                    <p className="sub-parameters"><span className='par-title'>Дата первого списания: </span>{formatDate(subscription.subscription_date)}</p>
                    <p className="sub-parameters"><span className='par-title'>Период подписки: </span>{subscription.period} дней</p>
                  </div>
                  <p className="sub-parameters">
                  <ul className="categories-data">
                  {subscription.categories.map(category => (
                    <li className='categories-data-item'>
                      <p className="sub-category" key={category.id}>{category.name}</p>
                    </li>
                  ))}
                  </ul>
                </p>
                </div>
              </Link>
            </li>
          ))}
          </ul>
        </div>
    </div>
  );
};

export default UsersSubs;


