import { GET_TASKS } from '../../graphql/queries';

export default (_, { taskId, message, status, current, total}, { cache }) => {
    const query = GET_TASKS;
    const prevTasks = cache.readQuery({ query });

    const data = {
        tasks: {
            statuses: {
                ...prevTasks.statuses
            },
        }
    };

    const taskStatus = {
        message,
        status,
        current,
        total,
    };

    data.tasks.statuses[taskId] = taskStatus;

    cache.writeQuery({
        query,
        data
    });
    return {
        ...taskStatus,
        taskId: taskId
    };
}