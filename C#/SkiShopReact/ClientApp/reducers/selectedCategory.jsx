import { GET_SELECTEDCATEGORY } from '../actions/getSelectedCategory';

const selectedCategory = ( state = '', action) => {
    switch (action.type) {
    case GET_SELECTEDCATEGORY:
        return action.category;
    default:
        return state;
    }
}

export default selectedCategory;