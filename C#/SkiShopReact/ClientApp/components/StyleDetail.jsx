import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap'
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';

import IfClearancePrice from './IfClearancePrice';
import { getStyleDetailAsync } from '../actions/getStyleDetail';
import { addLine } from '../actions/processShoppingCart';
import getSelectedCategory from '../actions/getSelectedCategory';

class StyleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skuArray: [],
            quantityPicked: 1,
            ifSkuPicked: true,
            ifInteger: true,
            ifTooMuch: false
        };
        this.sortSizes = this.sortSizes.bind(this);
        this.pickSize = this.pickSize.bind(this);
        this.pickQuantity = this.pickQuantity.bind(this);
        this.clickAddToCart = this.clickAddToCart.bind(this);
    }

    componentDidMount() {
        const { dispatch, styleNo } = this.props;
        dispatch(getStyleDetailAsync(styleNo)).then(
        () => {
            dispatch(getSelectedCategory(this.props.detail.categoryName));
            let sizes = this.props.detail.sizes.slice();
            sizes = this.sortSizes(sizes);
            let skus = [];
            sizes.forEach(size => {
                let index = this.props.detail.sizes.findIndex(s => s === size);
                let sku = {};
                sku.skuNo = this.props.detail.skuNos[index];
                sku.size = size;
                sku.quantity = this.props.detail.quantities[index];
                skus.push(sku);
            });
            this.setState({
                skuArray: skus.slice()
            });
        });
    }

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(getSelectedCategory());
    }

    sortSizes(sizes) {
        if (isNaN(Number(sizes[0][0]))) {
            let scorer = {
                'X-Small': 0, 'Small': 1, 'Medium': 2,
                'Large': 3, 'X-Large': 4
            };
            let finalSizes = sizes.sort((a, b) => {
                return scorer[a] - scorer[b];
            });
            return finalSizes;
        } else {
            let mySizes = [];
            sizes.forEach(s => {
                mySizes.push(Number(s.split('cm').slice(0, 1)));
            });
            mySizes = mySizes.sort();
            let finalSizes = [];
            mySizes.forEach(s => {
                finalSizes.push(String(s) + 'cm');
            });
            return finalSizes;
        }
    }

    pickSize(skuPicked) {
        this.setState({ skuPicked: skuPicked, ifSkuPicked: true });
    }

    pickQuantity(event) {
        this.setState({ quantityPicked: event.target.value });
    }

    clickAddToCart(e) {
        e.preventDefault();

        if (this.state.skuPicked === undefined || this.state.skuPicked === {}) {
            this.setState({ ifSkuPicked: false });
            return;
        }

        if (!Number.isInteger(Number(this.state.quantityPicked))) {
            this.setState({ ifInteger: false });
            return;
        } else {
            this.setState({ ifInteger: true });
        }

        if (Number(this.state.quantityPicked) > this.state.skuPicked.quantity) {
            this.setState({ ifTooMuch: true });
            return;
        } else {
            this.setState({ ifTooMuch: false });
        }

        const { dispatch, detail } = this.props;
        dispatch(addLine(
            this.state.skuPicked.skuNo,
            detail.brandName,
            detail.styleName,
            detail.gender,
            detail.priceCurrent, 
            this.state.skuPicked.size,
            Number(this.state.quantityPicked)
        ));

        dispatch(getSelectedCategory());

        dispatch(push('/cart'));

    }

    render() {
        if (this.props.detail.imageBig !== undefined &&
            this.props.detail.styleNo === this.props.styleNo) {
            const { detail } = this.props;
            let { skuArray } = this.state;
            return (
            <div className="container-fluid row">
                <div className="col-1"></div>
                <div className="col-4 mt-3">
                        <img src={ detail.imageBig } alt="loading picture..."
                         style={{ width: '100%' }} />
                </div>
                <div className="col-1"></div>
                <div className="col-6 mt-4">
                    <h5 className="text-muted">{detail.brandName.toUpperCase()}</h5>
                    <h4>{detail.styleName} - {detail.gender}</h4>
                    <h5><IfClearancePrice current={detail.priceCurrent} regular={detail.priceRegular} /></h5>

                    <ButtonGroup style={{flexFlow: 'wrap'}}>
                            {skuArray.map(sku =>
                                <Button color={sku.quantity === 0 ? 'disabled' : (this.state.skuPicked === sku ? 'info' : 'primary')}
                                    key={sku.skuNo} 
                                    onClick={() => this.pickSize(sku)}
                                    active={this.state.skuPicked === sku}
                                    disabled={sku.quantity === 0}>
                                    {sku.size}
                                </Button>
                                )}
                    </ButtonGroup>
                    
                    { !this.state.ifSkuPicked &&
                        <div>
                            <strong style={{ color: 'red' }}>
                                Please pick an available size.
                            </strong>
                        </div>
                    }

                    <div className="mt-4">
                        <label>Quantity:</label>
                        <div className="row">
                            <div className="col-6">
                                    <input type="number" min="1" max="99"
                                        className="form-control"
                                        value={this.state.quantityPicked}
                                        onChange={this.pickQuantity} />
                            </div>
                        </div>
                    </div>
                    { !this.state.ifInteger &&
                        <h6 style={{ color: 'red' }}>
                            Please input an integer.
                        </h6>
                    }
                    {this.state.ifTooMuch &&
                        <h6 style={{ color: 'red' }}>
                            Your cart quantity will be more than stock level.
                        </h6>
                    }
                    
                    <button className="btn btn-primary btn-lg mt-5"
                            style={{cursor:'pointer'}}
                            onClick={this.clickAddToCart}>
                        <span className="fa fa-shopping-cart"></span> &nbsp;
                        ADD TO CART
                    </button>
                </div>
            </div>
        );
        } else {
            return null;
        }
        
    }


}

StyleDetail.propTypes = {
    styleNo: PropTypes.string,
    detail: PropTypes.shape({
        styleNo: PropTypes.string,
        styleName: PropTypes.string,
        categoryName: PropTypes.string,
        brandName: PropTypes.string,
        gender: PropTypes.string,
        priceCurrent: PropTypes.number,
        priceRegular: PropTypes.number,
        imageBig: PropTypes.string,
        skuNos: PropTypes.arrayOf(PropTypes.string),
        sizes: PropTypes.arrayOf(PropTypes.string),
        quantities: PropTypes.arrayOf(PropTypes.number)
    })
}

StyleDetail.contextTypes = {
    router: PropTypes.object
}

export default StyleDetail;