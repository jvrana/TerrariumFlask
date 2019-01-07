import React, {Component} from 'react'
import {Breadcrumb, Nav, Navbar, Badge, Button} from 'react-bootstrap'
import connect from "react-redux/es/connect/connect";
import {PROJECT_NAME} from '../constants/application';
import RouterLink from './RouterLink';
import LogoutView from './LogoutView';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
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
        console.log(this.props);
        return (
            <div>
                {this.props.userName ? (
                    <Button variant="success">{this.props.userName} <Badge variant="light">9</Badge></Button>
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

const Navigation = () => (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <RouterLink to={"/home"}>
                <Navbar.Brand>{PROJECT_NAME}</Navbar.Brand>
            </RouterLink>
            <Navbar.Toggle/>

            <Navbar.Collapse>
                <Nav>
                    <RouterLink to="/home"><Nav.Link>Home</Nav.Link></RouterLink>
                    <RouterLink to={'/login'}><Nav.Link>Login</Nav.Link></RouterLink>
                    <RouterLink to={'/register'}><Nav.Link>Sign Up</Nav.Link></RouterLink>
                    <RouterLink to={'/logout'}><Nav.Link>Logout</Nav.Link></RouterLink>
                    <RouterLink to={'/user'}><Nav.Link>User</Nav.Link></RouterLink>

                </Nav>
            </Navbar.Collapse>

            <LoginToken/>
            <LogoutView />
        </Navbar>
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
    </div>
);

export default Navigation