import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSubscription.css';
import AdaptiveSelect from './AdaptiveSelect';


const AddSubscription = () => {
  const [choosenOptions, setChoosenOptions] = useState([]);



















  // Оля
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
    <div className='form-wrapper'>
      <div className="form-container">
        <span class="visually-hidden">Создание подписки</span>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="subs-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" for="name">Название подписки</label>
          <input className="subscription-title-input" type="text" name="name" id="name" placeholder="Название подписки" value={formData.name} onChange={handleChange} />
          <label>
            Категории:
            {/* <AdaptiveSelect choosenOptions = {choosenOptions} setChoosenOptions = {setChoosenOptions} categoriesData={categories}/> */}
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
          <label className="form-label">Цена (в руб.):
            <input className="form-control" type="number" name="price" value={formData.price} onChange={handleChange} />
          </label>
          <label className="form-label">Период (в днях):
            <input className="form-control" type="number" name="period" value={formData.period} onChange={handleChange} />
          </label>
          <label className="form-label">Дата подписки:
            <input className="form-control" type="date" name="subscription_date" value={formData.subscription_date} onChange={handleChange} />
          </label>
          <button className="btn btn-dark submit-button" type="submit">Создать подписку</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;

