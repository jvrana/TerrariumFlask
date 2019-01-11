import React from 'react'
import {Breadcrumb, Nav, Navbar} from 'react-bootstrap'
import {PROJECT_NAME} from '../constants';
import RouterLink from './support/RouterLink';

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
                    <RouterLink to={'/users'}><Nav.Link>Users</Nav.Link></RouterLink>
                </Nav>
            </Navbar.Collapse>

            {/*<LoginToken/>*/}
            {/*<LogoutView />*/}
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