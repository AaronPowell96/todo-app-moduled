import { getFilters } from "./filters"
import uuidv4 from "uuid/v4"
let todos = []

//get saved todos from local storage.
const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    todos = todosJSON !== null ? JSON.parse(todosJSON) : [];
};

//return todos array
const getTodos = () => todos;

//save todos to local storage
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text,
        completed: false
    })
    saveTodos()
}

const removeTodo = id => {
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        saveTodos()
    }
};

const toggleTodo = id => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

export { getTodos, createTodo, removeTodo, toggleTodo }
