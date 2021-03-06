import React, {Component} from "react";

import './Modal.css';

/* Higher Order Component - HOC */
import Aux from '../../../hoc/Aux/aux-hoc';

/* UI */
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }

    render() {
        return <Aux>
            <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
            <div className="Modal"
                 style={{
                     transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: this.props.show ? '1' : '0',
                 }}>
                {this.props.children}
            </div>
        </Aux>
    }
}
;

export default Modal;
