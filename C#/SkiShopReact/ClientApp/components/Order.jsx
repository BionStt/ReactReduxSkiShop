import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import { getOneOrderAsync } from '../actions/getOrders';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true
    }
    }

    componentDidMount() {
        const { dispatch, orderId } = this.props;
        dispatch(getOneOrderAsync(orderId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderId !== this.props.orderId) {
            this.props.dispatch(getOneOrderAsync(nextProps.orderId));
        }
    }

    render() {
        const { orderItems, orderId, totalValue } = this.props;

        return (
            <div>
                <h4>Order {`${numeral(orderId).format('000000000000')}`} Details</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Skis</th>
                            <th className="text-center">Size</th>
                            <th className="text-right">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map(item =>
                            <tr key={item.skuNo}>
                                <td>{item.skis}</td>
                                <td className="text-center">{item.size}</td>
                                <td className="text-right">
                                    {`${numeral(item.price).format('$0,0.00')}`}
                                </td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-right">
                                    {`${numeral(item.subtotal).format('$0,0.00')}`}
                                </td>
                            </tr>
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="text-right">
                                <strong>
                                    Total:
                                </strong>
                            </td>
                            <td className="text-right">
                                <strong>
                                    {`${numeral(totalValue).format('$0,0.00')}`}
                                </strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            );

    }

}

Order.propTypes = {
    orderItems: PropTypes.arrayOf(PropTypes.shape({
        skuNo: PropTypes.string,
        skis: PropTypes.string,
        size: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        subtotal: PropTypes.number
    })),
    orderId: PropTypes.number,
    totalValue: PropTypes.number
}

export default Order;
