import { connect } from 'react-redux';

import Orders from '../Orders';

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
    }
};

const OrdersCtn = connect(mapStateToProps)(Orders);

export default OrdersCtn;