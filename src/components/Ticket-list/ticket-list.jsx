import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { CompassOutlined, LoadingOutlined } from '@ant-design/icons';
import classes from './ticket-list.module.scss';
import { getListTickets, filterAllTickets, loadMore } from '../../actions';
import Ticket from './Ticket';

const TicketList = (props) => {
  const { delayedArr, isFetching, isLoad, onGetList, onLoad } = props;
  useEffect(onGetList, [onGetList]);
  if (isFetching) {
    const icon = <CompassOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className={classes['loading-icon']}>
        <Spin indicator={icon} size="large" />
      </div>
    );
  }
  let loadIcon = null;
  if (isLoad) {
    const icon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    loadIcon = (
      <div className={classes.loading}>
        <Spin indicator={icon} size="large" />
      </div>
    );
  } else {
    loadIcon = null;
  }
  if (delayedArr.length !== 0) {
    const elements = delayedArr.map((element) => {
      const { price, carrier, segments, id } = element;
      return (
        <li key={id} className={classes['ticket-item']}>
          <Ticket value={price} carrier={carrier} segments={segments} />
        </li>
      );
    });
    const moreButton = (
      <button type="button" onClick={onLoad} className={classes.ticket__more}>
        Показать ещё 10 билетов
      </button>
    );
    return (
      <ul className={classes['ticket-list']}>
        {loadIcon}
        {elements}
        {moreButton}
      </ul>
    );
  }
  return (
    <ul className={classes['ticket-list']}>
      <li className={classes['ticket-item']}>
        <div className={classes.empty__data}>Рейсов, подходящих под заданные фильтры, не найдено</div>
      </li>
    </ul>
  );
};

TicketList.propTypes = {
  delayedArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoad: PropTypes.bool.isRequired,
  onGetList: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state.tickets;
const mapDispatchToProps = (dispatch) => ({
  onGetList: () => dispatch(getListTickets()),
  filter: () => dispatch(filterAllTickets()),
  onLoad: () => dispatch(loadMore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
