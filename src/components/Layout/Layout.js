import React from "react";

import './Layout.css';

/* Higher Order Component - HOC */
import Aux from '../../hoc/aux-hoc';

/* Components */
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
    return <Aux>
        <div>
            <Toolbar/>
            <SideDrawer/>
        </div>
        <main className="content">
            {props.children}
        </main>
    </Aux>
};

export default layout;
