import { fetch } from 'domain-task';

export const GET_CATEGORYDETAIL = 'GET_CATEGORYDETAIL';

export function fetchCategoryDetail(category) {
    return fetch(`http://localhost:42014/skishop/getByCategory/${category}`);
}

export const getCategoryDetail= (category, styles) => {
    return {
        type: GET_CATEGORYDETAIL,
        category,
        styles
    }
}

export function getCategoryDetailAsync(category) {
    return dispatch => {
        return fetchCategoryDetail(category)
            .then(response => response.json())
            .then(styles => dispatch(getCategoryDetail(category, styles)));
    }
}