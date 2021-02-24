export const toggleCheckbox = (e) => ({
    type: "CHECKED",
    payload: {
        id: e.target.id,
    },
});

export const toggleCheckAll = (e) => ({
    type: "CHECK_ALL",
    payload: {
        checked: e.target.checked,
    },
});

export const setCheap = () => ({
    type: "CHEAP"
})

export const setFast = () => ({
    type: "FAST"
})
