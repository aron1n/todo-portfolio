// Grab elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Load saved tasks or start empty
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

// Render tasks
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    // Make the task draggable
    li.setAttribute("draggable", "true");

    // Apply completed class if done
    if (todo.done) li.classList.add("completed");

    // DONE button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = todo.done ? "✔" : "❌";
    doneBtn.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      saveAndRender();
    });

    // DELETE button
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveAndRender();
    });

    // Append buttons to li
    li.appendChild(doneBtn);
    li.appendChild(delBtn);

    // ===== Drag & Drop events =====
    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });
    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
    });
    // ===============================

    list.appendChild(li);
  });
}

// Helper function for drag & drop
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Enable dropping inside the list
list.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(list, e.clientY);
  const dragging = document.querySelector(".dragging");
  if (!dragging) return;
  if (afterElement == null) {
    list.appendChild(dragging);
  } else {
    list.insertBefore(dragging, afterElement);
  }
});

// Save to localStorage
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Add new task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, done: false });
    input.value = "";
    saveAndRender();
  }
});

// Initial render
renderTodos();

// DARK MODE TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById("dark-toggle");

  // Load saved preference
  const darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "true") {
    document.body.classList.add("dark");
    darkBtn.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    darkBtn.textContent = "Dark Mode";
  }

  // Toggle dark mode on click
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("dark-mode", isDark);
    darkBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
});

