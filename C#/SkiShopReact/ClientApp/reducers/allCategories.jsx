import { GET_CATEGORIES } from '../actions/getCategories';

const allCategories = (state=[], action) => {
    switch (action.type) {
    case GET_CATEGORIES:
        return state.length === 0
            ? action.categories.slice()
            : state;
    default:
        return state;
    }
}

export default allCategories;