import React, { useState , useEffect } from "react";

const Home = () => {
	const [ todo, setTodo ] = useState('');
	const [ todosList, setTodosList] = useState([]);
	const handleInput = (e) => {
		setTodo(e.target.value);
	}


	return (
		<div className="container ">
			<h1 className="text-center rounded my-2 p-3 mb-2 bg-info text-white">
				To Do List
			</h1>
			<div className="d-flex align-items-center">
				<input type="text" onChange={handleInput} value={todo} />
				<button 
					type="button" 
					className="btn btn-primary ms-2" 
					onClick={handleClick}
				>
					Add
				</button>
			</div>
			
			<div className="container">
				<ul className="list-group">
				{ todosList.map (( data , index) => (
					<li className="list-group-item" key={index}>
						<span> {data} </span>
					<button 
						type="button" 
						className="btn btn-danger"
						onClick={ () => setTodosList(
							todosList.filter(
								(currentIndex) =>  {index !== currentIndex})
							)
						}
					>
						Delete
					</button>
				</li>
				))}
				</ul>
				<div>
					<p> {todosList.length} pending {todosList.length === 1 ? "task" : "tasks"}</p>
					<p> {todosList.length === 0 ? "Add task" : null}</p>
				</div>
			</div>
		</div>
	);
};

export default Home;