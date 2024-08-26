import 'bootstrap/dist/css/bootstrap.min.css'; 
import { collection, addDoc, query, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useDrag, useDrop } from 'react-dnd';
import { firestore } from '../config/firebase';
import React, { useEffect, useState } from 'react';

const ItemTypes = {
    TASK: 'TASK'
};

const Task = ({ id, task, index, moveTask, handleDeleteTask }) => {
    const [, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id, index }
    });

    return (
        <div ref={drag} className="card">
            <div className="card-body d-flex justify-content-between align-items-center ">
                <span>{task}</span>
                <button
                    onClick={() => handleDeleteTask(id)}
                    className="btn btn-outline-danger btn-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

const TaskColumn = ({ status, tasks, moveTask, handleDeleteTask }) => {
    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            moveTask(item.id, status);
        }
    });

    return (

        <div className="col-md-4" ref={drop}>
            <div className="card">
                <div className="card-header text-center">
                    <h5 className="card-title">{status}</h5>
                </div>
                <div className="card-body">
                    {tasks
                        .filter(task => task.status === status)
                        .map((task, index) => (
                            <Task
                                key={task.id}
                                id={task.id}
                                task={task.task}
                                index={index}
                                moveTask={moveTask}
                                handleDeleteTask={handleDeleteTask}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

function Home() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleTaskChange = (e) => setTask(e.target.value);

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(firestore, "todotasks"), {
                task: task,
                status: 'To Do',
                date: new Date().toISOString()
            });
            setTask('');
        } catch (error) {
            console.error("Error adding document:", error.message);
        }
    };

    useEffect(() => {
        const q = query(collection(firestore, "todotasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksArray = [];
            querySnapshot.forEach((doc) => {
                tasksArray.push({ id: doc.id, ...doc.data() });
            });
            setTasks(tasksArray);
        });

        return () => unsubscribe();
    }, []);

    const updateTaskStatus = async (id, newStatus) => {
        try {
            const taskDocRef = doc(firestore, "todotasks", id);
            await updateDoc(taskDocRef, { status: newStatus });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteDoc(doc(firestore, "todotasks", id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const moveTask = (id, newStatus) => {
        const taskToMove = tasks.find(task => task.id === id);
        if (taskToMove) {
            updateTaskStatus(id, newStatus);
        }
    };

    return (
        <div className='container mt-4'>
            <div className="mb-4">
                <h2>Add Task to To-Do List</h2>
                <form onSubmit={handleAddTask} className="form-inline d-flex m-5">
                    <input
                        type="text"
                        className="form-control mr-2"
                        placeholder="Add Task"
                        value={task}
                        onChange={handleTaskChange}
                        required
                    />
                    <button type="submit" className="btn btn-outline-primary ms-2 w-50">Add Task</button>
                </form>
            </div>

            <h2 className="mb-4">Task Board</h2>

            <div className="row overflow-hidden">
                {['To Do', 'In Progress', 'Complete'].map(status => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasks}
                        moveTask={moveTask}
                        handleDeleteTask={handleDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
