import React from 'react'
import {Breadcrumb, Button, Badge, ButtonGroup, Nav, Navbar} from 'react-bootstrap'
import {PROJECT_NAME} from '../constants';
import RouterLink from './support/RouterLink';
import {compose} from 'react-apollo';
import {LoginPopup, LogoutPopup, RegisterPopup} from './AuthPopups'
import { withCurrentUser } from '../enhancers';


const LoginToken = (props) => {
    if (props.currentUser) {
        return <div>
            <div><ButtonGroup>
                <RouterLink to={"/profile"}>
                    <Button size="sm">{props.currentUser.email}</Button>
                </RouterLink>
                <LogoutPopup/>
            </ButtonGroup></div>
            <Badge variant={"info"}>{props.selectedConnectionId}</Badge>
        </div>
    } else {
        return <div>
            <ButtonGroup>
                <LoginPopup/>
                <RegisterPopup/>
            </ButtonGroup>
        </div>
    }
};

const EnhancedLogin = compose(
    withCurrentUser,
)(LoginToken);

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
                    <RouterLink to={'/register'}><Nav.Link>Sign Up</Nav.Link></RouterLink>
                    <RouterLink to={'/users'}><Nav.Link>Users</Nav.Link></RouterLink>
                    <RouterLink to={'/profile'}><Nav.Link>Profile</Nav.Link></RouterLink>
                    <RouterLink to={'/register'}><Nav.Link>Register</Nav.Link></RouterLink>
                    <RouterLink to={'/task'}><Nav.Link>Task</Nav.Link></RouterLink>
                </Nav>
            </Navbar.Collapse>

            <EnhancedLogin/>
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