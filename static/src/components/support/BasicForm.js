import React from "react";
import {isURL} from "validator";
import {Alert, Form} from "react-bootstrap";
import Form from "react-bootstrap/es/Form";

class RegisterConnectionForm extends React.Component {

    constructor() {
        super();
        this.state = {
            login: "",
            password: "",
            url: "",
            name: "",
            register: false,
            password_error_text: null,
            url_error_text: null,
            disabled: true,
        };

        this.changeValue = this.changeValue.bind(this);
    }

    isDisabled() {
        let password_is_valid = false;
        let url_is_valid = false;

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 1) {
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
            });
        } else {
            this.setState({
                url_error_text: 'url invalid',
            });
        }

        if (password_is_valid && url_is_valid) {
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
        this.setState({register: false});
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    register(e) {
        e.preventDefault();
        this.setState({register: true});
    }

    render() {
        const {disabled, password_error_text, url_error_text} = this.state;
        return <div>
            <h3>Register new connection</h3>
            <p>
                Input your credentials for your new connect. These should be the same credentials
                you use to login to the respective website.
            </p>
            {
                this.props.statusText &&
                <Alert variant={this.props.statusVariant}>{this.props.statusText}</Alert>
            }
            <Form>
                <Form.Group controlId="fromBasicText">
                    <Form.Label>Connection name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"
                                  onChange={(e) => this.changeValue(e, 'name')}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Connection email or login</Form.Label>
                    <Form.Control type="login" placeholder="Enter login"
                                  onChange={(e) => this.changeValue(e, 'login')}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Connection password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                                  onChange={(e) => this.changeValue(e, 'password')}/>
                    <Form.Text className="text-muted">{password_error_text}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicURL">
                    <Form.Label>Connection password</Form.Label>
                    <Form.Control type="text" placeholder="Enter url"
                                  onChange={(e) => this.changeValue(e, 'url')}/>
                    <Form.Text className="text-muted">{url_error_text}</Form.Text>
                </Form.Group>
