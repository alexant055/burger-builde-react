import React from "react";

import './Toolbar.css'

import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className="Toolbar">
        <div>MENU</div>
        <div className="Logo">
            <Logo/>
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
