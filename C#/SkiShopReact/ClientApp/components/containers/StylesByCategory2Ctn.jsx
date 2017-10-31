import { connect } from 'react-redux';

import getSelectedCategory from '../../actions/getSelectedCategory';
import HomeSkis from '../HomeSkis';

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategory: (category) => {
            dispatch(getSelectedCategory(category));
        }
    };
}

const StylesByCategory2Ctn = connect(null, mapDispatchToProps)(HomeSkis);

export default StylesByCategory2Ctn;