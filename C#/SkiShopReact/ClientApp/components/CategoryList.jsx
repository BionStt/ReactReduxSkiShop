import React from 'react';
import PropTypes from 'prop-types';

import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, selectedCategory, changeCategory }) => (
    <ul className="navbar-nav">
        {categories.map(category =>
                <CategoryItem key={category.categoryId} category={category.categoryName}
                              selectedCategory={selectedCategory}
                              onClick={() => changeCategory(category.categoryName)}/>
            )
        }
    </ul>
);

CategoryList.PropTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        categoryId: PropTypes.number.isRequired,
        categoryName: PropTypes.string.isRequired
    }).isRequired).isRequired,
    selectedCategory: PropTypes.string.isRequired,
    changeCategory: PropTypes.func.isRequired
}

export default CategoryList;