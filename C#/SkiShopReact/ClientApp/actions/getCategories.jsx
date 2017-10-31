import { fetch } from 'domain-task';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function fetchCategories() {
    return fetch('http://localhost:42014/skishop/getCategories');
}

export const getCategories = (categories) => {
    return {
        type: GET_CATEGORIES, 
        categories
    }
}

export function getCategoriesAsync() {
    return (dispatch) => {
        return fetchCategories()
            .then(response => response.json())
            .then(categories => {
                dispatch(getCategories(categories));
            })}
    }
