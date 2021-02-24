import React from 'react';
import classes from './ticket-list.module.scss';
import Ticket from './Ticket';

const TicketList = () => (
  <ul className={classes['ticket-list']}>
    <li className={classes['ticket-item']}>
      <Ticket />
    </li>
    <li className={classes['ticket-item']}>
      <Ticket />
    </li>
    <li className={classes['ticket-item']}>
      <Ticket />
    </li>
    <li className={classes['ticket-item']}>
      <Ticket />
    </li>
    <li className={classes['ticket-item']}>
      <Ticket />
    </li>
  </ul>
);

export default TicketList;
