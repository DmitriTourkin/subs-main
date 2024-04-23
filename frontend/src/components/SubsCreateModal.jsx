import React from 'react';
import { useState } from 'react';
import '../styles/df.css';
import AdaptiveSelect from './AdaptiveSelect';

export default function SubsCreateModal() {
  const [choosenOptions, setChoosenOptions] = useState([]);

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const formedData = new FormData(e.target);
    const title = formedData.get('title');
    const price = formedData.get('price');
    const date = formedData.get('date');
    const period = formedData.get('period');

    let newSubscription = {
      name: title,
      category: choosenOptions,
      price: price || 0,
      data: date, 
      period: period ?? '14 дней',
    };

    let jsonedSub = JSON.stringify(newSubscription)
    console.log(`Отправится на сервер: ${jsonedSub}`);

    //тут вызывает API для отправки. Ключ и токен будут браться из общего useContext, помещаться в заголовки.

  };

  return (
    <div className="form-wrapper">
      <div class="form-container">
        <form className="subs-form" id="form" onSubmit={handleSubmitButton}>
          <input className="subscription-title-input" id="title" name="title" placeholder="Название подписки"/>
          <label>Категории подписки</label>
            <AdaptiveSelect choosenOptions = {choosenOptions} setChoosenOptions = {setChoosenOptions}/>
          <label htmlFor="price" className="form-label" type="number">Цена
            <input id="price" name="price" className="form-control" type="price"/>
          </label>

          <label htmlFor="date" className="form-label" type="date">Дата первого списания
            <input id="date" name="date" className="form-control" type="datetime-local"/>
          </label>

          <label htmlFor="period" className="form-label">Период списания
            <select className="form-select">
              <option value={"2 дня"}>2</option> 
              <option value={"12 дней"}>12</option>
              <option value={"14 дней"}>14</option>
              <option value={"24 дня"}>24</option>
            </select>
          </label>
          <button className="btn btn-dark sumbit-button" type="submit">Создать</button>
        </form>
      </div>
    </div>
  );
};