import React from "react";

import './Layout.css';

/* Higher Order Component - HOC */
import Aux from '../../hoc/Aux';

const layout = (props) => {
    return <Aux>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>
        <main className="content">
            {props.children}
        </main>
    </Aux>
};

export default layout;
