import React from "react";

// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/aux-hoc';

import './SideDrawer.css';

const sideDrawer = (props) => {

    let attachedClasses = ["SideDrawer", "Close"];
    if (props.openDrawer)
        attachedClasses = ["SideDrawer", "Open"];

    return (
        <Aux>
            <Backdrop show={props.openDrawer} clicked={props.closeSideDrawer}/>
            <div className={attachedClasses.join(' ')}>
                < div className="SideDrawer-Logo">
                    {/*<Logo/>*/}
                </div>

                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>

    );
}

export default sideDrawer;
