import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCheapTickets, getFastTickets } from '../../actions';
import classes from './tabs.module.scss';

const classNames = require('classnames');

const Tabs = (props) => {
  const { data, onGetCheap, onGetFast } = props;
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
  const firstItem = data[0];
  const secondItem = data[1];
  return (
    <section className={classes.tabs}>
      {renderBarItem(firstItem, onGetCheap)}
      {renderBarItem(secondItem, onGetFast)}
    </section>
  );
};

Tabs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGetCheap: PropTypes.func.isRequired,
  onGetFast: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.bar;
const mapDispatchToProps = (dispatch) => ({
  onGetCheap: () => dispatch(getCheapTickets()),
  onGetFast: () => dispatch(getFastTickets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
