import constant from '../constants/filterConstants';

export default function (state = {}, action) {
    switch(action.type) {
        case constant.UPDATE_FILTERS:
            return {
                ...state,
                activeFilters: [ ...new Set(action.payload.activeFilters)], // removing duplicates
                products: action.payload.products,
                prices: action.payload.prices,
                sort: action.payload.sort
            };
        default:
            return state;
    }
}