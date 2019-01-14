import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {Alert, Button, Form} from 'react-bootstrap';
import {isEmail, isURL} from 'validator';
import {GET_TOKEN} from '../graphql/queries';
import { loginWithToken } from '../utils';

const Login = ({email, password}) => (
    <Query query={GET_TOKEN} variables={{email, password}}>
        {
            ({loading, error, data, client}) => {
                if (loading) return "Loading...";

                if (error) return <Alert variant={"danger"}>Error! {error.message}</Alert>;

                if (data.errors) return 'Error!';
                loginWithToken(client, data.token);
                return <Alert key={2} variant={"success"}> Logged in</Alert>
            }
        }
    </Query>
);

class LoginForm extends React.Component {

    constructor() {
        super();
        const redirectRoute = '/login';
        this.state = {
            email: "",
            password: "",
            login: false,
            email_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };

        this.changeValue = this.changeValue.bind(this);
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;

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

        if (email_is_valid && password_is_valid) {
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
        this.setState({login: false});
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    login(e) {
        e.preventDefault();
        this.setState({'login': true});
    }

    render() {
        const {disabled, email_error_text, password_error_text} = this.state;
        return <div>
            <h3>Sign in</h3>
            {
                this.props.statusText &&
                <Alert variant={this.props.statusVariant}>{this.props.statusText}</Alert>
            }
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email"
                                  onChange={(e) => this.changeValue(e, 'email')}/>
                    <Form.Text className="text-muted">{email_error_text}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                                  onChange={(e) => this.changeValue(e, 'password')}/>
                    <Form.Text className="text-muted">{password_error_text}</Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => this.login(e)} disabled={disabled}>
                    Sign In
                </Button>
                <div>
                    {this.state.login && <Login email={this.state.email} password={this.state.password}/>}
                </div>
            </Form>
        </div>
    }
}

export default LoginForm;