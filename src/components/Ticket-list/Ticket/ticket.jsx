import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import classes from './ticket.module.scss';

const timeToFly = (duration) => {
  const minutes = duration % 24;
  const hours = (duration - minutes) / 24;
  return `${hours}ч ${minutes}м`;
};
const getTransferTitle = (stops) => {
  const counter = stops.length;
  if (counter === 0) {
    return 'Без пересадок';
  }
  if (counter === 1) {
    return '1 пересадка';
  }
  return `${counter} пересадки`;
};
const getDepartureTime = (date, duration) => {
  const minutes = duration % 24;
  const hours = (duration - minutes) / 24;
  const time = new Date(date);
  time.setMinutes(time.getMinutes() + minutes);
  time.setHours(time.getHours() + hours);
  return format(new Date(time), 'HH:mm');
};
const getPathToIcon = (carrier) => `//pics.avs.io/99/36/${carrier}.png`;

const Ticket = (props) => {
  // eslint-disable-next-line react/prop-types
  const { value, carrier, segments } = props;
  const pathToIcon = getPathToIcon(carrier);
  const deps = segments.map((element, index) => {
    const { origin, destination, date, stops, duration } = element;
    const startTime = format(new Date(date), 'HH:mm');
    const durationTime = timeToFly(duration);
    const endTime = getDepartureTime(date, duration);
    const transferTitle = getTransferTitle(stops);
    let transfersCities = stops[0];
    if (stops.length >= 1) {
      for (let i = 1; i < stops.length; i++) {
        transfersCities += `, ${stops[i]}`;
      }
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index} className={classes.ticket__segment}>
        <div className={classes.ticket__city}>
          <div className={classes['ticket__city-title']}>
            {origin} - {destination}
          </div>
          <div className={classes['ticket__city-time']}>
            {startTime} - {endTime}
          </div>
        </div>
        <div className={classes.ticket__time}>
          <div className={classes['ticket__time-title']}> В пути </div>
          <div className={classes['ticket__time-time']}>{durationTime}</div>
        </div>
        <div className={classes.ticket__transfer}>
          <div className={classes['ticket__transfer-title']}>{transferTitle}</div>
          <div className={classes['ticket__transfer-cities']}>{transfersCities}</div>
        </div>
      </div>
    );
  });
  return (
    <section className={classes.ticket__container}>
      <div className={classes['ticket__info-upper']}>
        <span className={classes.ticket__price}>{value} P</span>
        <span className={classes.ticket__logo}>
          <img src={pathToIcon} alt="Aircompany logo" />
        </span>
      </div>
      <div className={classes['ticket__info-down']}>{deps}</div>
    </section>
  );
};

Ticket.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ticket;
