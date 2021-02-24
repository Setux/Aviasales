import {combineReducers} from "redux";

const initialFilterState = [
    { label: "Без пересадок", id: "2", isChecked: false },
    { label: "1 пересадка", id: "3", isChecked: false },
    { label: "2 пересадки", id: "4", isChecked: false },
    { label: "3 пересадки", id: "5", isChecked: false },
];
const initialBarState = [
    {label: 'Самый дешёвый', id: 1, isActive: true, isCheap: true},
    {label: 'Самый быстрый', id: 2, isActive: false, isFast: true}
]

const filterReducer = (state = initialFilterState, { type, payload }) => {
    switch (type) {
        case "CHECKED":
            return state.map((item) =>
                item.id === payload.id ? { ...item, isChecked: !item.isChecked } : item
            );
        case "CHECK_ALL":
            return state.map((item) => ({ ...item, isChecked: payload.checked }));
        default:
            return state;
    }
};

const barReducer = (state = initialBarState, {type}) => {
    switch (type) {
        case "CHEAP":
            return [{...state[0], isActive: true}, {...state[1], isActive: false}]
        case "FAST":
            return [{...state[0], isActive: false}, {...state[1], isActive: true}]
        default:
            return state
    }
}

const rootReducer = combineReducers({filter: filterReducer, bar: barReducer})

export default rootReducer