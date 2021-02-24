import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import classes from './tabs.module.scss';

const classNames = require('classnames');

const Tabs = ({ state, setCheap, setFast }) => {
  // eslint-disable-next-line consistent-return
  const setClass = (item) => {
    if (item.isCheap && item.isActive) {
      return `${classes.tabs__el} ${classes.tabs__el_cheap} ${classes.active}`;
    }
    if (item.isFast && item.isActive) {
      return `${classes.tabs__el} ${classes.tabs__el_fast} ${classes.active} `;
    }
    if (item.isFast) {
      return `${classes.tabs__el} ${classes.tabs__el_fast}`;
    }
    if (item.isCheap) {
      return `${classes.tabs__el} ${classes.tabs__el_cheap}`;
    }
  };
  const renderBarItem = (item, handler) => {
    const { label, id } = item;
    const barClass = classNames(setClass(item));
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div key={id} tabIndex={0} role="button" onClick={handler} className={barClass}>
        {label}
      </div>
    );
  };
  const firstItem = state.bar[0];
  const secondItem = state.bar[1];
  return (
    <section className={classes.tabs}>
      {renderBarItem(firstItem, setCheap)}
      {renderBarItem(secondItem, setFast)}
    </section>
  );
};

Tabs.propTypes = {
  state: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCheap: PropTypes.func.isRequired,
  setFast: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, actions)(Tabs);

// (
//     <section className={classes.tabs}>
//         <div className={`${classes.tabs__el  } ${  classes.tabs__el_cheap  } ${  classes.active}`}>
//             Самый дешёвый
//         </div>
//         <div className={`${classes.tabs__el  } ${  classes.tabs__el_fast}`}>Самый быстрый</div>
//     </section>
// )
