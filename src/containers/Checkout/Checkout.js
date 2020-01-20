import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";

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
        let summary = <Redirect to="/"/>

        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancelCheckout={this.cancelCheckoutHandler}
                        continuedCheckout={this.continuedCheckoutHandler}/>
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </div>
            );
        }


        return (
            <div>
                {summary}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.orderFunc.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
