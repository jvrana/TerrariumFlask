import React, {Component} from 'react';
import {Alert, Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/connect';
import {isEmail, isURL} from 'validator';


function mapStateToProps(state) {
    return {
        isAuthenticating: state.connect.isAuthenticating,
        statusText: state.connect.statusText,
        isAuthenticated: state.connect.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class ConnectionView extends Component {

    constructor() {
        super();

        this.state = {
            login: '',
            password: '',
            url: '',
            state: false,
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.register = this.register.bind(this);

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    handleRegister(e) {
        this.register(e);
        // this.handleClose()
    }

    register(e) {
        e.preventDefault();
        console.log(this.props);
        this.props.register(this.state.login, this.state.password, this.state.url);
    }

    render() {
        return <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new connection</Modal.Title>
                           {
                this.props.statusText &&
                <Alert variant='danger'>{this.props.statusText}</Alert>
            }
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Login
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext
                                              defaultValue="vrana"
                                              onChange={(e) => this.changeValue(e, 'login')}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password"
                                              defaultValue="password"
                                              onChange={(e) => this.changeValue(e, 'password')}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Aquarium URL
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext
                                              defaultValue="www.aquarium.org"
                                              onChange={(e) => this.changeValue(e, 'url')}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={this.handleRegister}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button onClick={this.handleShow}>New Connection</Button>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionView)
