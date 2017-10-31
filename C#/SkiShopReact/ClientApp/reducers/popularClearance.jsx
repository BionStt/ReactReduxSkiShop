import { GET_POPULAR, GET_CLEARANCE  }
    from '../actions/getPopularClearance';

export const stylesPopular = (state=[], action) => {
    switch (action.type) {
    case GET_POPULAR:
        return state.length === 0
            ? action.styles.slice(0, 3)
            : state;
    default:
        return state;
    }
};

export const stylesClearance = (state = [], action) => {
    switch (action.type) {
        case GET_CLEARANCE:
        return state.length === 0
            ? action.styles.slice(3)
            : state;
    default:
        return state;
    }
}