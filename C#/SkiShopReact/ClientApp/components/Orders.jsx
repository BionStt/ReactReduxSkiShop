import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Link, Route } from 'react-router-dom';

import { getOrdersAsync, getOneOrderAsync } from '../actions/getOrders';
import OrderInfo from './OrderInfo';

class Orders extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getOrdersAsync());
    }

    render() {
        const { orders } = this.props;
        return (
            <div className="container-fluid row">
                <div className="col-3 p-0">
                    <img src="image/left_order.jpeg" alt="loading picture..."
                         style={{ width: '100%' }} />
                </div>
                <div className="col-9">
                    <h3 className="mt-2">Your Order(s): </h3>

                    {orders === undefined
                        && <div></div> }

                    {(orders === undefined || orders === null || orders.length === 0) &&
                        <div className="alert alert-warning">
                            You haven't placed any orders yet.
                        </div>
                    }

                    { orders !== undefined 
                        && orders !== null 
                        && 
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr className="text-center">
                                    <th>Order No</th>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th className="text-center">Value</th>
                                    <th className="text-center">Create</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orders.map(order =>
                                    <tr key={order.orderId}>
                                        <td>
                                            <Link
                                            to={`/orders/${order.orderId}/${order.totalValue}`}>
                                                {`${numeral(order.orderId).format('000000000000')}`}
                                            </Link>
                                        </td>
                                        <td>{order.name}</td>
                                        <td>{order.city}</td>
                                        <td className="text-right">
                                        {`${numeral(order.totalValue).format('$0,0.00')}`}
                                        </td>
                                        <td className="text-right">{order.date}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }

                    <Route path="/orders/:orderId/:totalValue" component={OrderInfo} />
                </div>
            </div>
        );
    }
}

Orders.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
        orderId: PropTypes.number,
        name: PropTypes.string,
        city: PropTypes.string,
        totalValue: PropTypes.number,
        date: PropTypes.string
    }))
}

export default Orders;