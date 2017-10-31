import { GET_STYLEDETAIL } from '../actions/getStyleDetail';

const styleDetail = (state={}, action) => {
    switch (action.type) {
    case GET_STYLEDETAIL:
        return action.styleDetail;
    default:
        return state;
    }
}

export default styleDetail;