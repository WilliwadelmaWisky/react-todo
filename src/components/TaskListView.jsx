import TaskView from "./TaskView";
import ListHeader from "./ListHeader";

const TaskListView = ({header, tasks, onCompleteItem, onDeleteItem}) => {
    return (
        <>
            <h2>{header}</h2>
            {tasks.length <= 0 ? <div className="alert">Empty</div>:
            <div className="list">
                <ListHeader name={header}/>
                {tasks.map((task, index) => 
                    <TaskView 
                        key={index} 
                        task={task}
                        onComplete={() => onCompleteItem(task.id)}
                        onDelete={() => onDeleteItem(task.id)}
                    />
                )}
            </div>
            }
        </>
    );
};

export default TaskListView;