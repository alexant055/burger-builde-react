import React, {Component} from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import axios from "../../../axios-orders";

import './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // alert('continue');
        // .json used for firebase project
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Alexander Antony",
                address: {
                    street: "1904 Vinings Trl SE",
                    zipCode: '30080',
                    country: "United States"
                },
                email: "alexander_anto@outlook.com"
            },
            deliveryMethod: "fastest"
        }

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Your Name"/>
                <input className="Input" type="text" name="email" placeholder="Your email"/>
                <input className="Input" type="text" name="street" placeholder="Street"/>
                <input className="Input" type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading)
            form = <Spinner/>

        return (
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
