import React from 'react';

import OrderCtn from './containers/OrderCtn';

const OrderInfo = ({ match }) => (
    <div>
        <OrderCtn orderId={Number(match.params.orderId)}
            totalValue={Number(match.params.totalValue)} />
    </div>
    );

export default OrderInfo;