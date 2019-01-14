import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import BasicPopup from './support/BasicPopup';
import client from "../apollo/client";
import {PROJECT_NAME} from "../constants";

export const LoginPopup = (props) => (
        <BasicPopup title={"Login"} buttonName={"Sign in"} buttonVariant={"secondary"}>
            <LoginForm/>
        </BasicPopup>
    );

export const RegisterPopup = (props) => (
        <BasicPopup title={"Register new user"} buttonName={"Register"} buttonVariant={"light"}>
            <RegisterForm/>
        </BasicPopup>
    );

export class LogoutPopup extends React.Component {
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
        client.resetStore();
        localStorage.clear();
        this.handleClose()
    }

    render() {
        return  <>
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
    }
}