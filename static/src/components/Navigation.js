import React, { Component } from 'react'
import {Breadcrumb, Nav, Navbar} from 'react-bootstrap'
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from 'redux';
import WithStore from './WithStore';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class SignInToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false
        };
    }

    render() {
        console.log("RENDER")
        return (
            <div>
                <WithStore>
                    {(state, dispatch)} => {
                    <Navbar.Text>
                        Signed in as: <a href="/login">{state.token}</a>
                    </Navbar.Text>
                }
                </WithStore>
            </div>
        )
    }
}

const LoginToken = connect(mapStateToProps, mapDispatchToProps) (SignInToken)

const Navigation = () => (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href={"#home"}>Terrarium</Navbar.Brand>
            <Navbar.Toggle/>

            <Navbar.Collapse>
                <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>

                <LoginToken />
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