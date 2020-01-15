import React, {Component} from "react";
import {Route} from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    state = {
        ingredients: {},
        totalPrice: 0
    }

    componentDidMount() {
        const queryString = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of queryString.entries()) {
            if (param[0] !== "price")
                ingredients[param[0]] = +param[1];
            else
                price = param[1];
        }
        this.setState({totalPrice: price});
        this.setState({ingredients: ingredients})
    }

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
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continuedCheckout={this.continuedCheckoutHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props) => (
                           <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)
                       }/>
            </div>
        );
    }
}

export default Checkout;
