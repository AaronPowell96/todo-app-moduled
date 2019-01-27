import { renderTodos, generateSummaryDom, generateTodoDOM } from "./views"
import { setFilters } from "./filters"
import { createTodo } from "./todos"
renderTodos();

document.querySelector("#searchTodos").addEventListener("input", e => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos();
});

document.querySelector("#todoForm").addEventListener("submit", e => {
    e.preventDefault();
    let text = e.target.elements.todoItem.value.trim();
    if (text.length > 0) {
        createTodo(text);
        renderTodos();
        e.target.elements.todoItem.value = "";
    }
});

document.querySelector("#hideCompleted").addEventListener("change", e => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos();
});
