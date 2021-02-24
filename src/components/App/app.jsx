import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import FilterBox from '../Filter-box';
import Tabs from '../Tabs';
import TicketList from '../Ticket-list';
import classes from './app.module.scss';
import logo from './logo.svg';
import filterReducer from '../../reducer';

const store = createStore(filterReducer);

const App = () => (
  <Provider store={store}>
    <div className={classes.main}>
      <section className={classes.logo}>
        <img src={logo} alt="Logo" />
      </section>
      <FilterBox />
      <section className={classes.tickets__box}>
        <Tabs />
        <TicketList />
      </section>
    </div>
  </Provider>
);

export default App;
