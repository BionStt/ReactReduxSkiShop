import { connect } from 'react-redux';

import getSelectedCategory from '../../actions/getSelectedCategory';
import ShopBrand from '../ShopBrand';

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategory: () => {
            dispatch(getSelectedCategory());
        }
    };
}

const ShopBrandCtn = connect(null, mapDispatchToProps)(ShopBrand);

export default ShopBrandCtn;