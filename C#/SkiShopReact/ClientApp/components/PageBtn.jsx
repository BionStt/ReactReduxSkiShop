import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stringify } from 'qs';

const PageBtn = ({ page, selectedPage, pathname, search }) => (
    <Link to={{pathname: pathname, search: stringify(Object.assign({}, search, {page: page}))}}
        className={`btn btn-sm ${page === selectedPage ? 'btn-primary' : 'btn-outline-primary'}`}>
        {page}
    </Link>
);

PageBtn.propTypes = {
    page: PropTypes.number,
    selectedPage: PropTypes.number,
    pathname: PropTypes.string,
    search: PropTypes.object
}

export default PageBtn;

