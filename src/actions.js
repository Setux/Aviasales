import AviaService from "./services/aviasalesAPI";

const aviaAPI = new AviaService()

export const toggleCheckbox = (event) => ({
    type: "CHECKED",
    payload: {
        id: event.target.id,
    },
});

export const toggleCheckAll = (event) => ({
    type: "CHECK_ALL",
    payload: {
        checked: event.target.checked,
    },
});

export const setCheap = () => ({
    type: "CHEAP"
})

export const setFast = () => ({
    type: "FAST"
})

const setTickets = (data) => ({
    type: "SET_DATA",
    payload: data
})

const isFetching = () => ({
    type: "FETCHING"
})

export const getListTickets = () => (dispatch) => {
        dispatch(isFetching())
        aviaAPI.getTickets().then(
            res => {
                const {data} = res
                const {tickets} = data
                dispatch(isFetching())
                dispatch(setTickets(tickets))
            }
        )
    }


