import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import FilterBox from '../Filter-box';
import Tabs from '../Tabs';
import TicketList from '../Ticket-list';
import classes from './app.module.scss';

import logo from './logo.svg';
import filterReducer from '../../reducer';

const actionSanitizer = (action) =>
  action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ? { ...action, data: '<<LONG_BLOB>>' } : action;

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer: (state) => (state.data ? { ...state, data: '<<LONG_BLOB>>' } : state),
      })
    : compose;

const store = createStore(filterReducer, composeEnhancers(applyMiddleware(thunk)));

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
