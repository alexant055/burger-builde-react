import React, {Component} from "react";

import './Layout.css';

/* Higher Order Component - HOC */
import Aux from '../Aux/aux-hoc';

/* Components */
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return <Aux>
            <div>
                <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler}/>
                <SideDrawer openDrawer={this.state.showSideDrawer} closeSideDrawer={this.sideDrawerCloseHandler}/>
            </div>
            <main className="content">
                {this.props.children}
            </main>
        </Aux>
    }
}
;

export default Layout;
