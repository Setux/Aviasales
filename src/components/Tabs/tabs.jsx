import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import classes from './tabs.module.scss';

const classNames = require('classnames');

const Tabs = (props) => {
  const { data, setCheap, setFast } = props;
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
      {renderBarItem(firstItem, setCheap)}
      {renderBarItem(secondItem, setFast)}
    </section>
  );
};

Tabs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCheap: PropTypes.func.isRequired,
  setFast: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.bar;

export default connect(mapStateToProps, actions)(Tabs);
