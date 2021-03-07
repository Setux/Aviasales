import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './filter-box.module.scss';
import * as actions from '../../actions';

const FilterBox = ({ data, filterAllTickets, filterTickets }) => {
  const renderInput = (label, id, isChecked, handler) => (
    <li key={id} className={classes['filter-item']}>
      <label className={classes.filter__label}>
        <input
          id={id}
          onChange={(event) => handler(event)}
          checked={isChecked}
          className={classes.filter__input}
          type="checkbox"
        />
        <span className={classes.filter__check}> </span>
        {label}
      </label>
    </li>
  );
  const renderElements = () => data.map(({ label, id, isChecked }) => renderInput(label, id, isChecked, filterTickets));

  const areAllChecked = data.every((item) => item.isChecked);

  return (
    <section className={classes['filter-box']}>
      <h2 className={classes['filter-title']}>Количество пересадок</h2>
      <ul className={classes['filter-list']}>
        {renderInput('Все', '1', areAllChecked, filterAllTickets)}
        {renderElements()}
      </ul>
    </section>
  );
};

FilterBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterTickets: PropTypes.func.isRequired,
  filterAllTickets: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.filters;

export default connect(mapStateToProps, actions)(FilterBox);
