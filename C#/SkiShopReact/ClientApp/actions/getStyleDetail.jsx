import { fetch } from 'domain-task';

export const GET_STYLEDETAIL = 'GET_STYLEDETAIL';

export function fecthStyleDetail(styleNo) {
    return fetch(`http://localhost:42014/skishop/getStyleDetail/${styleNo}`);
}

export const getStyleDetail = (styleDetail) => {
    return {
        type: GET_STYLEDETAIL,
        styleDetail
    };
}

export function getStyleDetailAsync(styleNo) {
    return dispatch => {
        return fecthStyleDetail(styleNo)
            .then(response => response.json())
            .then(styleDetail => dispatch(getStyleDetail(styleDetail)));
    }
} 

