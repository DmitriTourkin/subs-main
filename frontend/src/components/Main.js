import '../components-styles/about-us.css';
import React from 'react';


export default function Main() {
  
  const ourTeam = [
    {id: 0, name: "Аверичев Владимир", group: "ПИ21-6", role: "Менеджер", stack: "PostgreSQL"},
    {id: 1, name: "Белова Ольга", group: "ПИ21-6", role: "Бэкенд-разработчик, базы данных", stack: "Python, Django, PostgreSQL"},
    {id: 2, name: "Жирнова Алиса", group: "ПИ21-6", role: "Верстальщик, фронтенд", stack: "HTML, CSS"},
    {id: 3, name: "Туркин Дмитрий", group: "ПИ21-6", role: "React-разработчик, фронтенд", stack: "JavaScript, React, HTML, CSS, Animations"}
  ];

  return (
    <>
      <head className="about_us-header">
        <div className="decorative-zone  marginning">
          <h1 className="about_us-header-title">Subscriptions</h1>
          <p className='header-text'>Проект по отслеживанию подписок. <br/>Cамое то, чтобы не терять ничего из головы</p>
        </div>
      </head>

      <main className='main marginning'>
        <section className="section our-team">
          <h2 className="section-subtitle">Наша команда</h2>
          <ul className='our-team-container'>
          {ourTeam.map(member => (
            <li key={member.id} className="list-item">
              <article className="team-member-card" key={member.id}>
                <div className="member-info">
                <div>
                  <p className="team-member-name">{member.name}</p>
                  <p className="member-group">{member.group}</p>
                </div>
                <p className="member-role">{member.role}</p>
                </div>
                <p className='member-stack'>{member.stack}</p>
              </article>
            </li>
          ))}
          </ul>
        </section>
        <section className="section our-goals">
          <h2 className='section-subtitle goals'>Цели проекта</h2>
          <div className='goals-section-text'>
            <p>Проект — разработка веб-приложения для отслеживания всех подписок конкретного человека или организации (расширенная версия) Пользователь изначально указывает все сервисы, на которые он подписан вне зависимости от привязанного номера телефона. </p>
            <p>Пользователь также может добавлять мероприятия (концерты, мастер-классы и т.д.), их стоимость и дату, когда должен оплатить, как напоминание. После этого все они отображаются на сайте с указанием цены подписки и даты списания следующего платежа.  </p>
          </div>
        </section>

        <section className='section why'>
          <h2 className="section-subtitle why">Почему наш продукт<br/>выигрышней?</h2>
          <ul className="reasons-list">
            <li className='reasons-list-item'>
              <p>отсутствие избыточности информации</p>
            </li>
            <li className='reasons-list-item'>
              <p>возможность добавления кастомизированных подписок</p>
            </li>
            <li className='reasons-list-item'>
              <p>бесплатный контент</p>
            </li>
            <li className='reasons-list-item'>
              <p>нет рекламы на сайте</p>
            </li>
          </ul>
        </section>

        <section className='section our-mission marginning'>
          <h2 className="section-subtitle our-mission">Наша миссия</h2>
          <p className=''>Мы разработали веб-приложение для отслеживания подписок пользователя. Наш продукт имеет множество преимуществ, он востребован в современном обществе. В процессе разработки нами было пройдено множество этапов, изучено множество технологий. Мы проанализировали  целевую аудиторию для нашего продукта, продумали функционал,  разработали удобный интуитивно понятный интерфейс, прописали backend, протестировали итоговый продукт. Наш продукт имеет некоторые недостатки. несмотря на это, он удобен для использования.  </p>
        </section>
      </main>
      <footer className='footer'>

      </footer>
    </>
  )
}