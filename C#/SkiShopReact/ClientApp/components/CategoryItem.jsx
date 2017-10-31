import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stringify } from 'qs';

const CategoryItem = ({ category, selectedCategory, onClick }) => (
    <li className={`nav-item ${category === selectedCategory ? 'bg-info' : ''}`}>
        <Link to={{ pathname: `/category/${category}`, search: stringify({ page: '1', sort: 'none' }) }}
            className="nav-link">
            <span className="text-white" onClick={onClick} style={{ fontSize: '0.80rem' }}>
                {category}
            </span>
        </Link>
    </li>
);

CategoryItem.PropTypes = {
    category: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CategoryItem;