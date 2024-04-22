import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSubscription.css';

const AddSubscription = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    period: 0,
    categories: [],
    subscription_date: new Date().toISOString().split('T')[0]
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prevState => ({
        ...prevState,
        categories: [...prevState.categories, value.toString()]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        categories: prevState.categories.filter(category => category !== value.toString())
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Требуется авторизация');
      }

      await axios.post('http://127.0.0.1:8000/api/subscription/', {
        name: formData.name,
        price: formData.price,
        period: formData.period,
        categories: formData.categories.map(category => parseInt(category)),
        subscription_date: formData.subscription_date,
        author: userId
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      window.location.href = '/subscription';
    } catch (error) {
      setError('Ошибка при создании подписки. Пожалуйста, попробуйте снова.');
      console.error('Failed to create subscription:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Создание подписки</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Название подписки:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Категории:
          {categories.map(category => (
            <div key={category.id}>
              <input
                type="checkbox"
                name="categories"
                value={String(category.id)}
                checked={formData.categories.includes(String(category.id))}
                onChange={handleCheckboxChange}
              />

              <span>{category.name}</span>
            </div>
          ))}
        </label>
        <label>
          Цена (в руб.):
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <label>
          Период (в днях):
          <input type="number" name="period" value={formData.period} onChange={handleChange} />
        </label>
        <label>
          Дата подписки:
          <input type="date" name="subscription_date" value={formData.subscription_date} onChange={handleChange} />
        </label>
        <button type="submit">Создать подписку</button>
      </form>
    </div>
  );
};

export default AddSubscription;

