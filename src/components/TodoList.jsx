import React, { useEffect, useState  } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BsTrash3, BsListTask } from 'react-icons/bs';

const LSK = 'TODO';

export default function TodoList() {
    const [todos, setTodos] = useState(() => {
        const value = localStorage.getItem(LSK)
        return value == null ? [] : JSON.parse(value);
    });

    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (newTodo.trim() !== '') {
            const newTodoItem = {
                id: uuidv4(),
                text: newTodo
            };

            setTodos((prevTodos) => [...prevTodos, newTodoItem]);
            setNewTodo('');
        }
    }

    
    const handleMarkAsDone = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
    };

    useEffect(() => {
        localStorage.setItem(LSK, JSON.stringify(todos))
    }, [todos])

    return(
        <>
            <div class="card ">
                <div class="card-title text-center mt-5">
                    <h1>To-Do List</h1>
                </div>
            <div class="card-body">
                <form class="input-group input-group-lg" onSubmit={handleSubmit}>
                    <span class="input-group-text" id="inputGroup-sizing-lg">New Task</span>
                    <input type="text" class="form-control" 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}></input>
                </form>
                <div id="add-task">
                <button className="my-3 p-2 btn btn-warning" onClick={handleSubmit}>Add New Task</button>
                </div>
                <hr />
                <h3 className="text-center"><BsListTask /> Tasks to Complete</h3>
                <ul className="todos-list">
                {todos.map((todo) => {
                    return(
                        <div className="todos">
                        <li key={todo.id}>{todo.text}</li>
                        <button className="btn btn-danger" onClick={() => handleMarkAsDone(todo.id)}
                        >Remove <BsTrash3 /></button>
                        </div>
                    )
                })}
                </ul>
            </div>
            </div>
        </>
    )
}