import React, {Component} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import { isEmail, isURL } from 'validator';


function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class RegisterView extends Component {

    constructor() {
        super();
        const redirectRoute = '/login';
        this.state = {
            email: "",
            password: "",
            url: "",
            email_error_text: null,
            password_error_text: null,
            url_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };

        this.changeValue = this.changeValue.bind(this);
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;
        let url_is_valid = true;

        if (isEmail(this.state.email)) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });
        } else {
            this.setState({
                email_error_text: 'email invalid',
            });
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });

        }

        if (isURL(this.state.url)) {
            url_is_valid = true;
            this.setState({
                url_error_text: null,
            })
        } else {
            this.setState({
                url_error_text: 'Invalid url'
            })
        }

        if (email_is_valid && password_is_valid && url_is_valid) {
            this.setState({
                disabled: false,
            });
        } else {
            this.setState({
                disabled: true
            })
        }

    }


    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    register(e) {
        e.preventDefault();
        this.props.registerUser(this.state.email, this.state.password);
    }

    render() {
        const { disabled, email_error_text, password_error_text } = this.state;
        return <div>
            <h3>Create Account</h3>
            <p>Input your Aquarium login credentials below</p>
            {
                this.props.registerStatusText &&
                <Alert variant='danger'>{this.props.registerStatusText}</Alert>
            }
            <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" onChange={(e) => this.changeValue(e, 'email')}/>
                <Form.Text className="text-muted">{email_error_text}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={(e) => this.changeValue(e, 'password')}/>
                <Form.Text className="text-muted">{password_error_text}</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => this.register(e)} disabled={disabled}>
                Create
            </Button>
        </Form></div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (RegisterView)
