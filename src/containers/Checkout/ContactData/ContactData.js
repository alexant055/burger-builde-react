import React, {Component} from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import axios from "../../../axios-orders";

import './ContactData.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {type: 'text', placeholder: 'Your Name'},
                value: '',
                validation: {
                    required: true
                }, valid: false, touched: false
            },
            street: {
                elementType: 'input', elementConfig: {type: 'text', placeholder: 'Street'}, value: '',
                validation: {
                    required: true
                }, valid: false, touched: false
            },
            zipCode: {
                elementType: 'input', elementConfig: {type: 'text', placeholder: 'ZIP Code'}, value: '',
                validation: {
                    required: true
                }, valid: false, touched: false
            },
            country: {
                elementType: 'input', elementConfig: {type: 'text', placeholder: 'Country'}, value: '',
                validation: {
                    required: true
                }, valid: false, touched: false
            },
            email: {
                elementType: 'input', elementConfig: {type: 'email', placeholder: 'Email'}, value: '',
                validation: {
                    required: true
                }, valid: false, touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: '', valid: true
            },
        },
        formValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (!rules)
            return true

        if (rules.required)
            isValid = value.trim() !== '';
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElement = {...updatedOrderForm[inputIdentifier]}
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)
        console.log(updatedElement.valid)
        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formValid: formIsValid});
    }

    orderHandler = (event) => {
        event.preventDefault();
        // alert('continue');
        // .json used for firebase project
        this.setState({loading: true});
        const formData = {};
        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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
        const formElement = [];
        for (let key in this.state.orderForm) {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElement.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event) => this.inputChangeHandler(event, element.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
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
