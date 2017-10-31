import React from 'react';

import StyleDetailCtn from './containers/StyleDetailCtn';

const StyleDetails = ({ match }) => (
    <div>
        <StyleDetailCtn styleNo={match.params.styleNo} />
    </div>
);

export default StyleDetails;