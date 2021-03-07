import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import { Spin } from 'antd';
import { CompassOutlined, LoadingOutlined } from '@ant-design/icons';
import classes from './ticket-list.module.scss';
import { getListTickets, filterAllTickets } from '../../actions';
import Ticket from './Ticket';

const TicketList = (props) => {
  const { filteredData, isFetching, isLoad, onGetList } = props;
  useEffect(onGetList, [onGetList]);
  if (isFetching) {
    const icon = <CompassOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className={classes['loading-icon']}>
        <Spin indicator={icon} size="large" />
      </div>
    );
  }
  const delayedArr = filteredData.slice(0, 10)
  // const getMoreTickets = () => {
  //
  // }
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
  if (filteredData.length !== 0) {
    const elements = delayedArr.map((element) => {
      const { price, carrier, segments, id } = element;
      return (
          <li key={id} className={classes['ticket-item']}>
            <Ticket value={price} carrier={carrier} segments={segments} />
          </li>
      );
    });
    const moreButton = <button type="button" className={classes.ticket__more}>Показать ещё 10 билетов</button>
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
            <div className={classes.empty__data}>
              Рейсов, подходящих под заданные фильтры, не найдено
            </div>
          </li>
        </ul>
    )
};

TicketList.propTypes = {
  // data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // visibleData: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoad: PropTypes.bool.isRequired,
  onGetList: PropTypes.func.isRequired,
  // filter: PropTypes.func.isRequired
};

const mapStateToProps = (state) => state.tickets;
const mapDispatchToProps = (dispatch) => ({
  onGetList: () => dispatch(getListTickets()),
  filter: () => dispatch(filterAllTickets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
