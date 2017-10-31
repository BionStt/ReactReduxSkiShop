import { fetch } from 'domain-task';

export const GET_POPULAR = 'GET_POPULAR';
export const GET_CLEARANCE = 'GET_CLEARANCE';

export function fetchPopularClearance () {
    return fetch('http://localhost:42014/skishop/getPopularClearance');
    }

export const getStylesPopular = (styles) => {
    return {
        type: GET_POPULAR,
        styles
};
}

export const getStylesClearance = (styles) => {
    return {
        type: GET_CLEARANCE, 
        styles
    };
}

export function getStylesPopularClearanceAsync() {
    return dispatch => {
        return fetchPopularClearance()
        .then(response => response.json())
            .then(styles => {
                dispatch(getStylesPopular(styles));
                dispatch(getStylesClearance(styles));
            })};
    }







