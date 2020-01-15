import React from "react";
import {NavLink} from "react-router-dom";

import './NavigationItem.css'

const navigateItem = (props) => (
    <li className="NavigationItem">
        <NavLink activeClassName="active"
                 exact={props.exact}
                 to={props.link}>{props.children}</NavLink>
    </li>
);

export default navigateItem;
