import { getTodos, toggleTodo, removeTodo } from "./todos"
import { getFilters } from "./filters"
//render todos

const renderTodos = () => {
    const todoEl = document.querySelector("#todoItems");
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = getTodos().filter(todo => {
        const searchTextMatch = todo.text
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const hideCompletedMatch = !hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });

    todoEl.innerHTML = "";

    const incompleteTodos = filteredTodos.filter(item => {
        return !item.completed;
    });

    todoEl.appendChild(generateSummaryDom(incompleteTodos));
    if (filteredTodos.length > 0) {
        filteredTodos.forEach(item => {
            todoEl.appendChild(generateTodoDOM(item));
        });
    } else {
        let emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No to-dos to show";
        todoEl.appendChild(emptyMessage);
    }
};

//generates the dom structure of todos area
const generateTodoDOM = item => {
    const todoEl = document.createElement("label");
    const containerEl = document.createElement("div");
    const todoText = document.createElement("span");
    const checkbox = document.createElement("input");
    const removeButton = document.createElement("button");

    //setup todo checkbox
    checkbox.setAttribute("type", "checkbox");
    containerEl.appendChild(checkbox);
    checkbox.checked = item.completed;
    checkbox.addEventListener("change", () => {
        toggleTodo(item.id);
        renderTodos();
    });
    //setup todos text
    todoText.textContent = item.text;
    containerEl.appendChild(todoText);

    //setup container
    todoEl.classList.add("list-item");
    containerEl.classList.add("list-item__container");
    todoEl.appendChild(containerEl);
    //setup todo remove button
    removeButton.textContent = "remove";
    removeButton.classList.add("button", "button--text");
    todoEl.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
        removeTodo(item.id);
        renderTodos();
    });

    return todoEl;
};

const generateSummaryDom = incompleteTodos => {
    const todoLength = incompleteTodos.length;
    const plural = todoLength === 1 ? `` : `s`;
    const summary = document.createElement("h1");
    summary.classList.add("list-title");
    summary.textContent = `You have ${todoLength} todo${plural} left!`;

    return summary;
};

export { generateTodoDOM, renderTodos, generateSummaryDom }
