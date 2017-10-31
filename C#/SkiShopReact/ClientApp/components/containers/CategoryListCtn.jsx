import { connect } from 'react-redux';

import getSelectedCategory from '../../actions/getSelectedCategory';
import CategoryList from '../CategoryList';

const mapStateToProps = (state) => {
    return {
        categories: state.allCategories,
        selectedCategory: state.selectedCategory
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategory: (category) => {
            dispatch(getSelectedCategory(category));
        }
    }

}

const CategoryListCtn = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList);

export default CategoryListCtn;