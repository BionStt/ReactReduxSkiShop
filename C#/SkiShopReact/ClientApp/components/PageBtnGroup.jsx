import React from 'react';
import PropTypes from 'prop-types';

import PageBtn from './PageBtn';

const PageBtnGroup = ({pages, selectedPage, pathname, search}) => {

    return (
        <div className="btn-group float-right">
            {pages.map(page =>
                <PageBtn key={page} page={page} selectedPage={selectedPage}
                         pathname={pathname} search={Object.assign({}, search)} />
            )}
        </div>
    );
}
    

PageBtnGroup.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.number),
    selectedPage: PropTypes.number,
    pathname: PropTypes.string,
    search: PropTypes.object
}

export default PageBtnGroup;