import React, {Component} from "react";

/* Higher Order Component - HOC */
import Aux from '../../hoc/Aux/aux-hoc';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

/* Components */
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";

import axios from "../../../src/axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    bacon: 0.7,
    meat: 0.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        console.log(this.props)
        axios.get("/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: error})
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) return;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    cancelPurchase = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryParam = [];
        for (let i in this.state.ingredients) {
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParam.push("price=" + this.state.totalPrice);
        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = (this.state.error) ? <p>Ingredients can't load at this time...</p> : <Spinner/>

        if (this.state.ingredients !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        purchase={this.purchaseHandler}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}/>
                </Aux>);
            orderSummary = <OrderSummary
                totalPrice={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.cancelPurchase}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default ErrorHandler(BurgerBuilder, axios);
