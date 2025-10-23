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
    if (todo.done) li.classList.add("completed");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = todo.done ? "✔" : "❌";
    doneBtn.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      saveAndRender();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveAndRender();
    });

    li.textContent = todo.text;
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

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
    darkBtn.textContent = "Light Mode"; // show Bright Mode if dark
  } else {
    document.body.classList.remove("dark");
    darkBtn.textContent = "Dark Mode"; // show Dark Mode if light
  }

  // Toggle dark mode on click
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Save preference
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("dark-mode", isDark);

    // Update button text
    darkBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
});
