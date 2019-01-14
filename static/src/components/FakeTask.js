import React from "react";
import { START_TASK, UPDATE_TASK, GET_TASK_STATUS} from "../graphql/queries";
import { Button, Alert, ProgressBar } from 'react-bootstrap';
import { Query } from 'react-apollo';

const TaskStatus = (props) => {
    console.log(`Asking for ${props.taskId}`);
    return <Query query={GET_TASK_STATUS} variables={{taskId: props.taskId}} pollInterval={10}>
        {({loading, error, data, refetch, stopPolling}) => {
            if (loading) return 'loading task';
            if (error) return <Alert>{error.message}</Alert>;
            let current = data.longTaskStatus.current;
            let total = data.longTaskStatus.total;
            let message = data.longTaskStatus.message;
            if (current == total) {
                stopPolling()
            }
            return <ProgressBar now={current} max={total} label={message}/>
        }}
    </Query>
};


const StartTask = () => {
    return <Query query={START_TASK}>
        {({loading, error, data, refetch}) => {
            if (loading) return 'loading task';
            if (error) return 'error on task';
            let taskId = data.longTask;
            return <div>
                <Button onClick={() => refetch()}>Start</Button>
                <TaskStatus taskId={taskId}/>
            </div>
        }}
    </Query>
};

const Task = () => (
    <div><StartTask /></div>
    );

export default Task;

// export default compose(
//     graphql(GET_TASK_STATUS, {
//         props: ({data}) => ({
//             status: data.status,
//             current: data.current,
//             total: data.total,
//         })}
//     ),
//     lifecycle(
//
//     )
// )(CheckStatus);