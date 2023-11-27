import React, { useState , useEffect } from "react";
let counter = 1;
const Lista = () => {
    const [ todo, setTodo ] = useState ('');
    const [tareas, setTareas] = useState([]);
    const [dbExist, setDbExist] = useState(false);
    const handleInput = (evt) => {
        setTodo(evt.target.value);
    }
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


    const handleDelte = async () => {
        await fetch ('https://playground.4geeks.com/apis/fake/todos/user/winston', {
                method: "DELETE",
            })
        setTodo(''),
        setTareas([])
    };

    const handleFinish = (todoId) => async function () {
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
    return (
        <div>
            <input onChange={handleInput}></input>
            <button onClick={handleClick}> add todo </button>
            <button onClick={handleDelte}> delete all</button>
            {
                tareas.map (({done, id, label}) => 
                <div key={id} >
                    <p style={{textDecoration: done ? "line-through" : null}}
                    > 
                        {label} 
                    </p>
                    <button onClick={handleFinish(id)}> finish </button>
                </div>)
            }
        </div>
    )
}

export default Lista;