import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import RouterLink from '../RouterLink';

function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        isAuthenticated: state.auth.isAuthenticated
    };
}

class SignInToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false
        };
    }

    render() {
        return (
            <div>
                {this.props.userName ? (
                    <RouterLink to="/user">
                        <Button variant="success">{this.props.userName} <Badge variant="light">9</Badge></Button>
                    </RouterLink>
                ) : (
                    <RouterLink to="/login">
                        <Button variant="danger">Sign in</Button>
                    </RouterLink>
                )
                }
            </div>
        )
    }
}

const LoginToken = connect(mapStateToProps)(SignInToken);

export default LoginToken;