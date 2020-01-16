import React, {Component} from "react";
import {Route} from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

import {connect} from "react-redux";

class Checkout extends Component {
    continuedCheckoutHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continuedCheckout={this.continuedCheckoutHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);
