import { connect } from 'react-redux';

import getSelectedCategory from '../../actions/getSelectedCategory';
import HomeSkis from '../HomeSkis';

const mapStateToProps = (state) => {
    return {
        skiArray: state.stylesPopular
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategory: (category) => {
            dispatch(getSelectedCategory(category));
        }
    };
}

const StylesPopularCtn = connect(mapStateToProps, mapDispatchToProps)(HomeSkis);

export default StylesPopularCtn;