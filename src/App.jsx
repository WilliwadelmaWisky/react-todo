import { useEffect, useState } from "react";
import TaskListView from "./components/TaskListView";
import { MdLibraryAdd, MdClearAll } from "react-icons/md";
import { TbDatabaseExport } from "react-icons/tb";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState({ name: "", date: "2023-12-07" })

    useEffect(() => {
        console.log("data loaded from local storage")
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        if (tasks)
            setTasks(tasks)
    }, [])


    const save = () => {
        console.log("data saved to local storage")
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    const clear = () => {
        console.log("data cleared from local storage")
        localStorage.removeItem("tasks")
        setTasks([])
    }
    

    const createTask = (taskData) => {
        const newTask = { ...{id: uuidv4()}, ...taskData, ...{isCompleted: false }}
        return newTask
    }


    const onAdd = () => {
        if (!currentTask.name)
            return;

        console.log("add new task");
        setTasks(prevState => [
            ...prevState, 
            createTask(currentTask)
        ])
    };

    const onRemove = (id) => {
        const index = tasks.findIndex(task => task.id === id)
        if (index === -1)
        return;
    
        console.log("remove: " + id + ", index of: " + index)
        setTasks(prevState => ([
            ...prevState.slice(0, index),
            ...prevState.slice(index + 1)
        ]))
    };

    const onComplete = (id) => {
        const index = tasks.findIndex(task => task.id === id)
        if (index === -1)
        return;
    
        console.log("complete: " + id + ", index of: " + index)
        setTasks(prevState => ([
            ...prevState.slice(0, index),
            { ...tasks[index], isCompleted: true },
            ...prevState.slice(index + 1)
        ]))
    }

    return (
        <>
            <div className="w80">
                <h1>To-Do-List</h1>
                <div className="h-flex gap1 mt1 flex-align-center">
                    <input 
                        type="text"
                        className="flex-grow"
                        placeholder="Enter task..."
                        value={currentTask.name}
                        onChange={(e) => {
                            setCurrentTask(current => ({
                                ...current, ...{name: e.target.value}
                            }))
                        }}
                    />
                    <input 
                        type="date"
                        value={currentTask.date}
                        onChange={(e) => {
                            setCurrentTask(current => ({
                                ...current, ...{date: e.target.value}
                            }))
                        }}
                    />
                    <button onClick={onAdd}><MdLibraryAdd size={30}/></button>
                    <button onClick={clear}><MdClearAll size={30}/></button>
                    <button onClick={save}><TbDatabaseExport size={30}/></button>
                </div>
                <TaskListView 
                    header="Tasks" 
                    tasks={tasks.filter(task => !task.isCompleted)}
                    onCompleteItem={onComplete}
                    onDeleteItem={onRemove}
                />
                <TaskListView 
                    header="Completed" 
                    tasks={tasks.filter(task => task.isCompleted)}
                    onCompleteItem={(id) => {}}
                    onDeleteItem={onRemove}
                />
            </div>
        </>
    );
};

export default App;
