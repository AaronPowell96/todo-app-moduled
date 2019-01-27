import { getFilters } from "./filters"

let todos = []

//get saved todos from local storage
const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    return todosJSON !== null ? JSON.parse(todosJSON) : [];
};

//return todos array
const getTodos = () => todos;

//save todos to local storage
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

