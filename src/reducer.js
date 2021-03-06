import {combineReducers} from "redux";

const initialFilterState = {
    data: [
        { label: "Без пересадок", id: "2", isChecked: true },
        { label: "1 пересадка", id: "3", isChecked: true },
        { label: "2 пересадки", id: "4", isChecked: true },
        { label: "3 пересадки", id: "5", isChecked: true },
    ],
};
const initialBarState = {
    data: [
        {label: 'Самый дешёвый', id: 1, isActive: true, isCheap: true},
        {label: 'Самый быстрый', id: 2, isActive: false, isFast: true}
    ],
}
const initialTicketsState = {
    data: [],
    isFetching: false
}

const filterReducer = (state = initialFilterState, { type, payload }) => {
    let newData
    switch (type) {
        case "CHECKED":
            newData = state.data.map((item) =>
                item.id === payload.id ? { ...item, isChecked: !item.isChecked } : item
            );
            return {
                data: newData
            }
        case "CHECK_ALL":
            newData = state.data.map((item) => ({ ...item, isChecked: payload.checked }));
            return {
                data: newData
            }
        default:
            return state;
    }
};

const barReducer = (state = initialBarState, {type}) => {
    let newData
    switch (type) {
        case "CHEAP":
            newData = [{...state.data[0], isActive: true}, {...state.data[1], isActive: false}]
            return {
                data: newData
            }
        case "FAST":
            newData = [{...state.data[0], isActive: false}, {...state.data[1], isActive: true}]
            return {
                data: newData
            }
        default:
            return state
    }
}

const ticketsReducer = (state = initialTicketsState, {type, payload}) => {
    switch (type) {
        case "SET_DATA":
            return {
                ...state,
                data: [...state.data, ...payload]
            }
        case "FETCHING":
            return {...state, isFetching: !state.isFetching}
        default:
            return state

    }
}

const rootReducer = combineReducers({filters: filterReducer, bar: barReducer, tickets: ticketsReducer})

export default rootReducer