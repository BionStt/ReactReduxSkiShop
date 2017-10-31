import { GET_CATEGORYDETAIL } from '../actions/getCategoryDetail';

const categoryDetail = (state=[], action) => {
    switch (action.type) {
    case GET_CATEGORYDETAIL:
            return [...state,
                { category: action.category, styles: action.styles.slice() }];
    default:
        return state;
    }
}

export default categoryDetail;