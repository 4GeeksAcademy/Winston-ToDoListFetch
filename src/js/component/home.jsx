import React, { useState , useEffect } from "react";
let counter = 1
const Home = () => {
	const [ todo, setTodo ] = useState('');
	const [tareas, setTareas] = useState([]);
    const [dbExist, setDbExist] = useState(false);
	const handleInput = (e) => {
		setTodo(e.target.value);
	}
	
	useEffect(() => {
        const createDb = async () => {
            const res = await fetch ('https://playground.4geeks.com/apis/fake/todos/user/winston', {
                method: "POST",
                body: JSON.stringify([]),
                headers: {
                  "Content-Type": "application/json"
                }
              });
            const data = await res.json();
            if (data.msg === "The user exist") {
                setDbExist(true)
            }
        }
        createDb();
    },[]);
	
	useEffect(() => {
        if (dbExist) {
            const getDb = async () => {
                const res = await fetch ('https://playground.4geeks.com/apis/fake/todos/user/winston')
                const data = await res.json();
                setTareas (data);
            }
            getDb();
        } 
    },[dbExist]);
	
	const handleClick = async() => {
        const newTodo = {
            id: counter,
            done: false,
            label: todo
        }
        counter += 1
        const newTodos = [...tareas, newTodo]
        await fetch ('https://playground.4geeks.com/apis/fake/todos/user/winston', {
                method: "PUT",
                body: JSON.stringify(newTodos),
                headers: {
                  "Content-Type": "application/json"
                }
              });
        setTareas(newTodos)
        setTodo('')
    }

	const handleDeleteTodo = (todoId) => async function () {
        const newTodos = tareas.filter (({id}) => id !== todoId)
        await fetch ('https://playground.4geeks.com/apis/fake/todos/user/winston', {
                method: "PUT",
                body: JSON.stringify(newTodos),
                headers: {
                  "Content-Type": "application/json"
                }
              });
        setTareas(newTodos);
    }

	const handleDelete = async () => {
        await fetch ('https://playground.4geeks.com/apis/fake/todos/user/winston', {
                method: "DELETE",
            })
        setTodo(''),
        setTareas([])
		alert("The user has been deleted. You can add tasks, but they won't be saved")
		alert("Pls reload the page")
    };

	return (
		<div className="container ">
			<h1 className="text-center rounded my-2 p-3 mb-2 bg-info text-white">
				To Do List
			</h1>
			<div className="d-flex align-items-center justify-content-center">
				<input type="text" onChange={handleInput} value={todo} />
				<button 
					type="button" 
					className="btn btn-primary ms-2" 
					onClick={handleClick}
				>
					Add
				</button>
				<button 
					type="button" 
					className="btn btn-danger ms-2"
					onClick={handleDelete}					
				>
					Delete All Data 
				</button>
			</div>
			
			<div className="container">
				<ul className="list-group">
				{ tareas.map (( {id, label} , index) => (
					<li className="list-group-item my-2" key={index}>
						<span key={id}> {label} </span>
					<button 
						type="button" 
						className="btn btn-danger"
						onClick={handleDeleteTodo(id)}					
					>
						Delete
					</button>
				</li>
				))}
				</ul>
				<div>
					<p> {tareas.length} pending {tareas.length === 1 ? "task" : "tasks"}</p>
					<p> {tareas.length === 0 ? "Add task" : null}</p>
				</div>
			</div>
		</div>
	);
};

export default Home;