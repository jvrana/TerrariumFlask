import React, {Component} from 'react';
import {Tab, Tabs, Button} from 'react-bootstrap';
import connect from "react-redux/es/connect/connect";
import ConnectionView from './RegisterAPIConnectionView';

function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        isAuthenticated: state.auth.isAuthenticated
    };
}

class UserView extends Component {
    render() {
        return <div>
            <h2>{this.props.userName}'s Profile</h2>
            <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                <Tab eventKey="home" title="Profile">
                    {/*<Sonnet/>*/}
                </Tab>
                <Tab eventKey="profile" title="Connections">
                    <ConnectionView />
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    {/*<Sonnet/>*/}
                </Tab>
            </Tabs></div>;
    }
}

export default connect(mapStateToProps)(UserView)