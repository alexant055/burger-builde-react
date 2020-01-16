import React from "react";

import "./Input.css";

const input = (props) => {
    let inputElement = null;

    console.log(props)
    const classes = "InputElement " + (props.invalid && props.shouldValidate && props.touched ? "Invalid" : "")

    switch (props.elementType) {
        case ('input'):
            inputElement =
                <input {...props.elementConfig} className={classes} value={props.value} onChange={props.changed}/>;
            break;
        case ("textarea"):
            inputElement = <textarea {...props.elementConfig} className={classes} value={props.value}
                                     onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select className={classes} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>{option.displayValue}</option>
                    ))}
                </select>);
            break;
        default:
            inputElement =
                <input {...props.elementConfig} className={classes} value={props.value} onChange={props.changed}/>;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
