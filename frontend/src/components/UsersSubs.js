import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersSubs.css';
import {Link} from "react-router-dom";

const UsersSubs = () => {
  const [userId, setUserId] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

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
    <div className="subscriptions-container">
      {subscriptions.map(subscription => (
        <div key={subscription.id} className="subscription-item">
          <Link to={`/subscription/${subscription.id}`} className="link">
          <h2>{subscription.name}</h2>
          </Link>
          <p><strong>Цена:</strong> {subscription.price} рублей</p>
          <p><strong>Дата первого списания:</strong> {formatDate(subscription.subscription_date)}</p>
          <p><strong>Период подписки:</strong> {subscription.period} дней</p>
          <p><strong>Категории:</strong>
            {subscription.categories.map(category => (
              <span key={category.id}> {category.name}</span>
            ))}
          </p>

        </div>
      ))}
    </div>
  );
};

export default UsersSubs;


