import { combineReducers } from 'redux';

const initialFilterState = {
  data: [
    { label: 'Без пересадок', id: '2', isChecked: true },
    { label: '1 пересадка', id: '3', isChecked: true },
    { label: '2 пересадки', id: '4', isChecked: true },
    { label: '3 пересадки', id: '5', isChecked: true },
  ],
};
const initialBarState = {
  data: [
    { label: 'Самый дешёвый', id: 1, isActive: false, isCheap: true },
    { label: 'Самый быстрый', id: 2, isActive: false, isFast: true },
  ],
};
const initialTicketsState = {
  data: [],
  filteredData: [],
  delayedArr: [],
  filterOptions: [
    { isOn: true, id: '1' },
    { isOn: true, id: '2' },
    { isOn: true, id: '3' },
    { isOn: true, id: '4' },
    { isOn: true, id: '5' },
  ],
  isFetching: false,
  isLoad: false,
  isOnFast: false,
  isOnCheap: false,
};

const filterReducer = (state = initialFilterState, { type, payload }) => {
  let newData;
  switch (type) {
    case 'CHECKED':
      newData = state.data.map((item) => (item.id === payload.id ? { ...item, isChecked: !item.isChecked } : item));
      return {
        data: newData,
      };
    case 'CHECK_ALL':
      newData = state.data.map((item) => ({ ...item, isChecked: payload.checked }));
      return {
        data: newData,
      };
    default:
      return state;
  }
};

const barReducer = (state = initialBarState, { type }) => {
  let newData;
  switch (type) {
    case 'CHEAP':
      newData = [
        { ...state.data[0], isActive: true },
        { ...state.data[1], isActive: false },
      ];
      return {
        data: newData,
      };
    case 'FAST':
      newData = [
        { ...state.data[0], isActive: false },
        { ...state.data[1], isActive: true },
      ];
      return {
        data: newData,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line consistent-return
const ticketsReducer = (state = initialTicketsState, { type, payload }) => {
  const { data, filteredData, delayedArr, isFetching, isLoad, filterOptions, isOnFast, isOnCheap } = state;
  let filtered = filteredData;
  let filterPortion;
  let filterOpt;
  let anyOff;
  switch (type) {
    case 'SET_DATA':
      return {
        ...state,
        data: [...data, ...payload],
      };
    case 'LOAD_DATA':
      return state;
    case 'LOAD_MORE':
      return {
        ...state,
        delayedArr: [...delayedArr, ...filteredData.slice(delayedArr.length, delayedArr.length + 10)],
      };
    case 'SET_CHEAP':
      filtered = filtered.sort((prev, next) => prev.price - next.price);
      return {
        ...state,
        filteredData: filtered,
        isOnCheap: true,
        isOnFast: false,
        delayedArr: [...filteredData.slice(0, 10)],
      };
    case 'SET_FAST':
      filtered = filtered.sort((prev, next) => {
        let prevCount = 0;
        prev.segments.forEach((element) => {
          prevCount += element.duration;
        });
        let nextCount = 0;
        next.segments.forEach((element) => {
          nextCount += element.duration;
        });
        return prevCount - nextCount;
      });
      return {
        ...state,
        filteredData: filtered,
        isOnCheap: false,
        isOnFast: true,
        delayedArr: [...filteredData.slice(0, 10)],
      };
    case 'FETCHING':
      return { ...state, isFetching: !isFetching };
    case 'LOADING':
      return {
        ...state,
        isLoad: !isLoad,
      };
    case 'SET_FILTER':
      filterOpt = filterOptions.map((item) => (item.id === payload.id ? { ...item, isOn: payload.checked } : item));
      anyOff = filterOpt.some((item) => !item.isOn);
      if (anyOff) {
        filterOpt[0].isOn = false;
      }
      return {
        ...state,
        filterOptions: filterOpt,
      };
    case 'SET_FILTER_ALL':
      filterOpt = filterOptions.map((item) => ({ ...item, isOn: payload.checked }));
      return {
        ...state,
        filterOptions: filterOpt,
      };
    case 'SET_FILTERED_TICKETS':
      filtered = [];
      filterOptions.forEach((element) => {
        if (element.isOn) {
          switch (element.id) {
            case '1':
              filtered = [...data];
              break;
            case '2':
              filterPortion = data.filter((el) => {
                const firstSegment = el.segments[0];
                const secondSegment = el.segments[1];
                return firstSegment.stops.length === 0 || secondSegment.stops.length === 0;
              });
              filtered = [...filterPortion];
              break;
            case '3':
              filterPortion = data.filter((el) => {
                const firstSegment = el.segments[0];
                const secondSegment = el.segments[1];
                return firstSegment.stops.length === 1 || secondSegment.stops.length === 1;
              });
              filterPortion.forEach((el) => {
                const includes = filtered.some((ticket) => ticket.id === el.id);
                if (includes === false) {
                  filtered = [...filtered, el];
                }
              });
              break;
            case '4':
              filterPortion = data.filter((el) => {
                const firstSegment = el.segments[0];
                const secondSegment = el.segments[1];
                return firstSegment.stops.length === 2 || secondSegment.stops.length === 2;
              });
              filterPortion.forEach((el) => {
                const includes = filtered.some((ticket) => ticket.id === el.id);
                if (includes === false) {
                  filtered = [...filtered, el];
                }
              });
              break;
            case '5':
              filterPortion = data.filter((el) => {
                const firstSegment = el.segments[0];
                const secondSegment = el.segments[1];
                return firstSegment.stops.length === 3 || secondSegment.stops.length === 3;
              });
              filterPortion.forEach((el) => {
                const includes = filtered.some((ticket) => ticket.id === el.id);
                if (includes === false) {
                  filtered = [...filtered, el];
                }
              });
              break;
            default:
              return null;
          }
        }
        return null;
      });
      if (isOnFast) {
        filtered = filtered.sort((prev, next) => {
          let prevCount = 0;
          prev.segments.forEach((element) => {
            prevCount += element.duration;
          });
          let nextCount = 0;
          next.segments.forEach((element) => {
            nextCount += element.duration;
          });
          return prevCount - nextCount;
        });
      }
      if (isOnCheap) {
        filtered = filtered.sort((prev, next) => prev.price - next.price);
      }
      return {
        ...state,
        filteredData: filtered,
        delayedArr: [...filtered.slice(0, 10)],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ filters: filterReducer, bar: barReducer, tickets: ticketsReducer });

export default rootReducer;
