import React from 'react';
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/auth";
import {Button, Modal} from 'react-bootstrap';
import {PROJECT_NAME} from '../constants/application';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        isAuthenticated: state.auth.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class LogoutModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    handleLogout() {
        this.props.logoutAndRedirect();
        this.handleClose()
    }

    render() {
        // return <></>
        if (this.props.isAuthenticated) {
            return (
                <>
                    <Button variant="light" size='sm' onClick={this.handleShow}>
                        Logout
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Logging {this.props.userName} out of {PROJECT_NAME}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to logout?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={this.handleLogout}>
                                Logout
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        } else {
            return <></>
        }
    }
}

const LogoutView = connect(mapStateToProps, mapDispatchToProps)(LogoutModal);

export default LogoutView;