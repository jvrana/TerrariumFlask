import React from 'react';
import {Query} from "react-apollo";
import {GET_CURRENT_SESSION} from "../graphql/queries";
import {Button, Tabs, Tab} from "react-bootstrap";
import RegisterConnectionPopup from './RegisterConnectionPopup'
import Connections from './Connections'

const Profile = () => (
    <div>User Profile</div>
);

const ProfileView = () => (
    <Tabs defaultActiveKey={"profile"} id="uncontrolled-tab">
        <Tab eventKey="profile" title="Profile">
            <Profile />
        </Tab>
        <Tab eventKey="connections" title="Connections">
            <h3>Connections</h3>
            <RegisterConnectionPopup />
            <Connections />
        </Tab>
        <Tab eventKey="jobs" title="Jobs">
            <div>jobs here</div>
        </Tab>
        <Tab eventKey="designs" title="Designs">
            <div>designs here</div>
        </Tab>
        <Tab eventKey="models" title="Models">
            <div>designs here</div>
        </Tab>
    </Tabs>
);

const ProfileContainer = () => (
    <Query query={GET_CURRENT_SESSION}>
        {({loading, error, data}) => {
            if (loading) return 'loading profile';
            if (error) return 'error loading profile';
            if (data.currentSession.currentUser) {
                return <ProfileView />
            } else {
                return <div>error loading profile</div>
            }
        }}
    </Query>
);


export default ProfileContainer;