import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SubDetail.css'; // Импортируем CSS файл для стилей отображения подписок

const SubDetail = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/subscription/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch subscription');
        }
        const data = await response.json();
        setSubscription(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubscription();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '/');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/subscription/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }
      // Обновляем страницу для обновления данных
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="subscription-details"> {/* Добавляем класс "subscription-details" для стилей */}
      {subscription && (
        <div>
          <h2>{subscription.name}</h2>
          <p><strong>Цена:</strong> {subscription.price} рублей</p>
          <p><strong>Дата первого списания:</strong> {formatDate(subscription.subscription_date)}</p>
          <p><strong>Период подписки:</strong> {subscription.period} дней</p>
          <p><strong>Категории:</strong>
            {subscription.categories.map(category => (
              <span key={category.id}> {category.name}</span>
            ))}
          </p>
          <button onClick={handleDelete}>Удалить подписку</button>
        </div>
      )}
    </div>
  );
};

export default SubDetail;

