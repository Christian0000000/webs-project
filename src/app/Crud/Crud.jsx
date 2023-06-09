import React from 'react';
import { db } from '../../firebase'
import { uid } from 'uid'
import { set, ref, onValue, remove, update } from 'firebase/database';
import { useState, useEffect } from 'react';

const Crud = () => {    
    const [ todo, setTodo ] = useState("")
    const [ todos, setTodos ] = useState([])
    const [ isEdit, setIsEdit ] = useState(false)
    const [ tempUuid, setTempUuid ] = useState("")

    const handleTodoChange = (e) => {
        setTodo(e.target.value)
    }
    
    //read
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTodos([])
            const data = snapshot.val()
            if(data !== null){
                Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo])
                })
            }
        })
    }, [])

    //write
    const writeToDB = () => {
        const uuid = uid()
        set(ref(db, `/${uuid}`), {
            todo,
            uuid
        })

        setTodo("")
    }

    //update
    const handleUpdate = (todo) => {
        setIsEdit(true)
        setTempUuid(todo.uuid)
        setTodo(todo.todo)
    }

    const handleSubmitChange = () => {
        update(ref(db, `/${tempUuid}`), {
            todo,
            uuid: tempUuid
        })

        setTodo("")
        setIsEdit(false)
    }

    //delete
    const handleDelete = (todo) => {
        remove(ref(db, `/${todo.uuid}`))
    }

    return (
        <div>
            <input type="text" value={todo} onChange={handleTodoChange} />
            {isEdit ? (
                <div>
                    <button onClick={handleSubmitChange}>Submit Change</button>
                    <button onClick={() => {
                        setIsEdit(false)
                        setTodo("")
                    }}>X</button>
                </div>
            ) : (
                <button onClick={writeToDB}>Submit</button>
            )}
            
            {todos.map(todo => (
                <div>
                    <h1>{todo.todo}</h1>
                    <button onClick={() => handleUpdate(todo)}>update</button>
                    <button onClick={() => handleDelete(todo)}>delete</button>
                </div>
            ))}
        </div>
    )
}

export default Crud