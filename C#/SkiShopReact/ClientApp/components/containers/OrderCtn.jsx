import { connect } from 'react-redux';

import Order from '../Order';

const mapStateToProps = (state) => {
    return {
        orderItems: state.orderItems
    }
};

const OrderCtn = connect(mapStateToProps)(Order);

export default OrderCtn;