import {Query} from "react-apollo";
import {GET_REMOTE_PING, START_REMOTE_PING} from "../../graphql/queries";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import React from "react";

const TaskStatus = (props) => {
    return <Query query={props.status_query} variables={{taskId: props.taskId}} pollInterval={5000}>
        {({loading, error, data, refetch, stopPolling}) => {
            if (loading) return 'loading task';
            if (error) return <OverlayTrigger overlay={<Tooltip>{error.message}</Tooltip>}>
                    <Badge pill variant="danger" size="sm">
                        error
                    </Badge>
            </OverlayTrigger>
            let taskStatus = props.getTaskStatus(data);
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




const StartTask = (props) => {
    return <Query query={props.start_query} variables={props.variables}>
        {({loading, error, data, refetch}) => {
            if (loading) return props.onStartLoad;
            if (error) return props.onStartError;
            let taskId = getTaskId(data);
            return <TaskStatus
                status_query={props.status_query}
                taskId={taskId}
                onTaskLoad={props.onTaskLoad}
                onTaskError={props.onTaskError}
            />
        }}
    </Query>
};

const Task = (props) => {
    return (
        <StartTask
            start_query={START_TASK}
            status_query={START_TASK}
            variables={variables}
            onStartLoad={<div>loading task</div>}
            onStartError={<div>task errors</div>}
            getTask={(data) => {data.startPingTask}}
            getTaskStatus={(data) => {data.pingTaskStatus}}
            onStatusLoad={<div>loading task status</div>}
            onStatusError={<div>task status error</div>}
            />
    )
}

