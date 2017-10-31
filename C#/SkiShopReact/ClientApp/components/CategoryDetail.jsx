import React from 'react';
import { parse } from 'qs';

import StylesByCategoryCtn from './containers/StylesByCategoryCtn';

const CategoryDetail = ({ match, location }) => {
    let query = parse(location.search.substr(1));
    let pathname = location.pathname;

    return (
    <div>
        <StylesByCategoryCtn category={match.params.category}
            pathname={pathname} search={query}
            selectedPage={Number(query.page)}
            sort={query.sort}
            filterGender={query.gender}
            filterIdealFor={query.idealFor}/>
    </div>
);
}

export default CategoryDetail;