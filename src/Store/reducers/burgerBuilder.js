import * as actionTypes from "../actions/actionTypes";

import {updateObject} from "../utility";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    bacon: 0.7,
    meat: 0.5
}

const initialState = {
    ingredients: {},
    totalPrice: 4,
    error: false
};

const addIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, {
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }),
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    });
};

const removeIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, {
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }),
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    });
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    })
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true});
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return fetchIngredientsFailed(state);
        default:
            return state;
    }
};

export default burgerBuilder;
