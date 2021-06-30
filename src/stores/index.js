import data from './data.json';
import search from './../helper';

export const initialState = {
    filter: "",
    filteredItems: data,
    selectedItems: [{
        "id": 1,
        "label": "People",
        "entity": "people"
    }],
    openItems: {},
    isOpen: false,
    response: []
}

export function reducer(state, action) {
    switch (action.type) {
        case 'set_response':
            return { ...state, response: action.response }
        case 'set_is_open':
            return { ...state, isOpen: action.isOpen }
        case 'set_filter':
            return {
                ...state,
                isOpen: action.filter.length > 0 ? true : false,
                filter: action.filter
            }
        case 'set_selected_items':
            const index = state.selectedItems.findIndex(item => item.id === action.item.id);
            index >= 0 ? state.selectedItems.splice(index, 1) : state.selectedItems.push(action.item);
            return {
                ...state,
                selectedItems: [action.item]
            }
        case 'set_open_items':
            return { ...state, openItems: action.openItems }
        default:
            throw new Error();
    }
}