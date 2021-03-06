import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Spin } from 'antd';
import classes from './ticket-list.module.scss';
import { getListTickets } from '../../actions';
import Ticket from './Ticket';

const TicketList = (props) => {
  const { data, isFetching, onGetList } = props;
  useEffect(() => {
    onGetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isFetching) {
    return (
      <div className={classes['loading-icon']}>
        <Spin size="large" />
      </div>
    );
  }

  const elements = data.map((element) => {
    const { price, carrier, segments } = element;
    return (
      <li key={nanoid(5)} className={classes['ticket-item']}>
        <Ticket value={price} carrier={carrier} segments={segments} />
      </li>
    );
  });
  return <ul className={classes['ticket-list']}>{elements}</ul>;
};

TicketList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  onGetList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.tickets;
const mapDispatchToProps = (dispatch) => ({
  onGetList: () => dispatch(getListTickets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
