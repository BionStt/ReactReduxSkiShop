import React from 'react';

import StylesPopularCtn from './containers/StylesPopularCtn';
import StylesClearanceCtn from './containers/StylesClearanceCtn';

const Home = () => {
    return (
        <div className="container-fluid row">
            <div className="col-3 p-0">
                <img src="image/left.jpg" alt="loading picture..." style={{width: '100%' }}/>
            </div>

            <div className="col-9">
                <h6 class="pt-3">Most Popular Non-clearance:</h6>
                <StylesPopularCtn />
                <h6>Most Popular Clearance:</h6>
                <StylesClearanceCtn />
            </div>

        </div>
        );
}

export default Home;