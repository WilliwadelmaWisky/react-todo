import { FaTrash, FaFileCircleCheck } from "react-icons/fa6";

const TaskView = ({task, onComplete, onDelete}) => {
    return (
        <div className="h-flex flex-align-center gap1">
            <p className="flex-grow">{task.name}</p>
            <p className="w-150">{task.date}</p>
            <button onClick={onComplete} disabled={task.isCompleted}><FaFileCircleCheck size={30}/></button>
            <button onClick={onDelete}><FaTrash size={30}/></button>
        </div>
    );
};

export default TaskView;