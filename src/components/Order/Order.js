import React from "react";

import "./Order.css";

const Order = (props) => {
    const ingredients = [];
    console.log(props.ingredients)
    for (let name in props.ingredients) {
        ingredients.push({
            name: name,
            amount: props.ingredients[name]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid #ccc'
        }}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className="Order">
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;
