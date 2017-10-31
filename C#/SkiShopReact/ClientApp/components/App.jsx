import React from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';

import ShopHead from './ShopHead';
import Home from './Home';
import CartCtn from './containers/CartCtn';
import CategoryDetail from './CategoryDetail';
import StyleDetails from './StyleDetails';
import OrdersCtn from './containers/OrdersCtn';
import CheckoutCtn from './containers/CheckoutCtn';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <div>
            <ShopHead />
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/cart" component={CartCtn} />
                <Route path="/checkout" component={CheckoutCtn} />
                <Route path="/orders" component={OrdersCtn} />
                <Route path="/category/:category"
                        component={CategoryDetail} />
                <Route path="/styleDetail/:category/:styleNo"
                        component={StyleDetails} />
            </div>
        </div>
        );
    }
}

export default App;