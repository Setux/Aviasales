import { nanoid } from 'nanoid';
import AviaService from './services/aviasalesAPI';

const aviaAPI = new AviaService();

export const toggleCheckAll = (event) => ({
  type: 'CHECK_ALL',
  payload: {
    checked: event.target.checked,
  },
});
const filterToggleAll = (event) => ({
  type: 'SET_FILTER_ALL',
  payload: {
    checked: event.target.checked,
  },
});

const toggleCheckbox = (event) => ({
  type: 'CHECKED',
  payload: {
    id: event.target.id,
  },
});
const filterToggle = (event) => ({
  type: 'SET_FILTER',
  payload: {
    id: event.target.id,
    checked: event.target.checked,
  },
});
const setFilterTickets = () => ({
  type: 'SET_FILTERED_TICKETS',
});

const setCheap = () => ({
  type: 'CHEAP',
});
const filterCheap = () => ({
  type: 'SET_CHEAP',
});

const setFast = () => ({
  type: 'FAST',
});
const filterFast = () => ({
  type: 'SET_FAST',
});

const setTickets = (data) => ({
  type: 'SET_DATA',
  payload: data,
});

const loadTickets = () => ({
  type: 'LOAD_DATA',
});

const isFetching = () => ({
  type: 'FETCHING',
});
const isLoading = () => ({
  type: 'LOADING',
});

const getTicket = async (id, arr) => {
  const data = await aviaAPI.getTickets(id);
  const { tickets, stop } = await data;
  const pushArr = tickets.map((element) => ({
    ...element,
    id: nanoid(8),
  }));
  arr.push(...pushArr);
  if (stop === false) {
    await getTicket(id, arr);
  }
};

export const getListTickets = () => async (dispatch) => {
  dispatch(isFetching());
  const id = await aviaAPI.getID();
  const tickets = [];
  await getTicket(id, tickets);
  dispatch(isFetching());
  dispatch(setTickets(tickets));
  dispatch(setFilterTickets());
  dispatch(loadTickets());
};

export const getCheapTickets = () => (dispatch) => {
  dispatch(isLoading());
  dispatch(setCheap());
  dispatch(filterCheap());
  dispatch(isLoading());
};
export const getFastTickets = () => (dispatch) => {
  dispatch(isLoading());
  dispatch(setFast());
  dispatch(filterFast());
  dispatch(isLoading());
};

export const filterTickets = (event) => (dispatch) => {
  dispatch(isLoading());
  dispatch(toggleCheckbox(event));
  dispatch(filterToggle(event));
  dispatch(setFilterTickets());
  dispatch(isLoading());
};
export const filterAllTickets = (event) => (dispatch) => {
  dispatch(isLoading());
  dispatch(toggleCheckAll(event));
  dispatch(filterToggleAll(event));
  setTimeout(dispatch(setFilterTickets()), 1500);
  dispatch(isLoading());
};
