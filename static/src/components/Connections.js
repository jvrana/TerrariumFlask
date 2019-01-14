import React from 'react';
import {compose} from 'recompose';
import {Button, ButtonGroup, Table, Badge, OverlayTrigger, Tooltip, Alert, ProgressBar} from 'react-bootstrap';
import { withConnections, withCurrentUser } from '../enhancers';
import { graphql, Query } from 'react-apollo';
import { UPDATE_CONNECTION } from '../graphql/mutations';
import {GET_REMOTE_PING, START_REMOTE_PING} from '../graphql/queries';
import EditConnectionPopup from './EditConnectionPopup';


const PingStatus = (props) => {
    return <Query query={GET_REMOTE_PING} variables={{taskId: props.taskId}} pollInterval={5000}>
        {({loading, error, data, refetch, stopPolling}) => {
            if (loading) return 'loading task';
            if (error) return <OverlayTrigger overlay={<Tooltip>{error.message}</Tooltip>}>
                    <Badge pill variant="danger" size="sm">
                        error
                    </Badge>
            </OverlayTrigger>;
            let current = data.pingTaskStatus.current;
            let total = data.pingTaskStatus.total;
            let message = data.pingTaskStatus.message;
            if (current == total) {
                stopPolling()
                return <Badge pill variant="info" size="sm">{Math.round(data.pingTaskStatus.result * 100 * 1000)/ 100}ms</Badge>
            }
            return <Badge pill variant="warning" size="sm">contacting service...</Badge>
        }}
    </Query>
};


const StartPing = (props) => {
    console.log("Trying to ping...")
    console.log(props);
    return <Query query={START_REMOTE_PING} variables={{connectionId: props.connectionId}}>
        {({loading, error, data, refetch}) => {
            if (loading) return 'loading task';
            if (error) return 'error on task';
            console.log(data);
            let taskId = data.startPingTask.id
            return <div>
                <PingStatus taskId={taskId}/>
            </div>
        }}
    </Query>
};

const ConnectionTable = (props) => {
    return <Table striped border hover size="sm">
        <thead>
        <tr>
            <th>Name</th>
            <th>Login</th>
            <th>URL</th>
            <th>Selection</th>
            <th>Status</th>
            {/*<th>Select</th>*/}
        </tr>
        </thead>
        <tbody>
        {props.edges.map(edge => {
            if (edge.node.id == props.selectedConnectionId) {
                console.log("OK")
            }
            return <tr>
                <td>{edge.node.name}</td>
                <td>{edge.node.login}</td>
                <td><a href={edge.node.url} target="_blank">{edge.node.url}</a></td>
                <td>
                    <ButtonGroup>
                        {(props.selectedConnectionId == edge.node.id) ?
                            <Button variant="success" size="sm" disabled>Selected!</Button> :
                            <Button variant="outline-secondary" size="sm" onClick={() => {
                                props.updateConnection({variables: {connectionId: edge.node.id}})}}>
                                Select
                            </Button>}
                        <EditConnectionPopup connectionId={edge.node.id}/>
                    </ButtonGroup>
                </td>
                <td>
                    <StartPing connectionId={edge.node.id} />
                </td>
            </tr>
        })}
        </tbody>
    </Table>
};

const Connections = (props) => {

    console.log(props);

    if (props.connections) {
        return <ConnectionTable selectedConnectionId={props.selectedConnectionId} edges={props.connections.edges} updateConnection={props.updateConnection}/>
    } else {
        return <div>loading</div>
    }
};

const EnhancedConnections = compose(
    withConnections,
    withCurrentUser,
    graphql(UPDATE_CONNECTION, {name: 'updateConnection'})
)(Connections);

export default EnhancedConnections