import React from 'react';
import classes from './ticket.module.scss';
import s7 from './s7.svg';

const Ticket = () => (
  <section className={classes.ticket__container}>
    <div className={classes['ticket__info-upper']}>
      <span className={classes.ticket__price}>13 400 P</span>
      <span className={classes.ticket__logo}>
        <img src={s7} alt="Aircompany logo" />
      </span>
    </div>
    <div className={classes['ticket__info-down']}>
      <div className={classes.ticket__city}>
        <div>
          <p className={classes['ticket__city-cities']}>MOW - HKT</p>
          <p className={classes['ticket__city-time']}>10:45 - 08:00</p>
        </div>
        <div>
          <p className={classes['ticket__city-cities']}>MOW - HKT</p>
          <p className={classes['ticket__city-time']}>11:20 - 00:50</p>
        </div>
      </div>
      <div className={classes.ticket__time}>
        <div>
          <p className={classes['ticket__time-title']}>В пути</p>
          <p className={classes['ticket__time-time']}>21ч 15м</p>
        </div>
        <div>
          <p className={classes['ticket__time-title']}>В пути</p>
          <p className={classes['ticket__time-time']}>13ч 30м</p>
        </div>
      </div>
      <div className={classes.ticket__transfer}>
        <div>
          <p className={classes['ticket__transfer-title']}>2 пересадки</p>
          <p className={classes['ticket__transfer-cities']}>HKG, INB</p>
        </div>
        <div>
          <p className={classes['ticket__transfer-title']}>1 пересадка</p>
          <p className={classes['ticket__transfer-cities']}>HKG</p>
        </div>
      </div>
    </div>
  </section>
);

export default Ticket;
