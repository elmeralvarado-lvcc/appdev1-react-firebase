import { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const ListTodos = ({ user }) => {
    const [loading, setLoading] = useState(true)
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])

    const fetchTodos = async (limit=5) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
            const data = await response.json()
            setTodos(data)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const handleToggleTodo = (id) => {
        setTodos(todos.map(todo => (
        todo.id === id ? {...todo, completed: !todo.completed } : todo
        )))
    }

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleNewTodo = () => {
        setTodos([...todos, {id: todos.length + 1, title: newTodo, completed: false}])
        setNewTodo('')
    }

    if (loading) return <>Loading ....</>

    return (
        <>
            <div>
            <h3>Welcome, {user}</h3>
            <input type="text" value={newTodo} placeholder='Add todo' onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={handleNewTodo}><FaPlus /> Add</button>
            <ul>
                {todos.map(todo => (
                <li key={todo.id}>
                    <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
                    {todo.completed ? <s>{todo.title}</s> : todo.title}
                    <button onClick={() => handleDeleteTodo(todo.id)}><MdDelete /> delete</button>
                </li>
                ))}
            </ul>
            </div>
        </>
    )
}

export default ListTodos