import React from 'react';
import {Alert, Table} from 'react-bootstrap';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { GET_USERS } from '../graphql/queries'

const UserTable = ({users}) => (
    <Table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Email</th>
        </tr>
        </thead>
        <tbody>
        {
            users.map((user) => (
                <tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                </tr>)
            )
        }
        </tbody>
    </Table>
);

const Users = () => (
    <div>
        <Query query={GET_USERS}>
            {({loading, error, data}) => {
                if (loading) return "loading...";
                if (error) return <Alert variant={"danger"}>Error! {error.message}</Alert>;
                return <UserTable users={data.users} />
            }}
        </Query>
    </div>
);

export default Users;