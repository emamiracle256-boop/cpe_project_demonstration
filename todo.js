// Load tasks from LocalStorage when the page opens
window.onload = loadTasks;

function addTask() {
    let taskInput = document.getElementById("task");
    let taskValue = taskInput.value;

    if (taskValue) {
        createTaskElement(taskValue, false);
        taskInput.value = "";
        saveTasks();
    }
}

function createTaskElement(text, isCompleted) {
    let li = document.createElement("li");
    if (isCompleted) li.classList.add("completed");

    li.innerHTML = `
        <span onclick="toggleComplete(this)">${text}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("list").appendChild(li);
}

function toggleComplete(span) {
    span.parentElement.classList.toggle("completed");
    saveTasks();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

// 3. Persistence: Local Storage Logic
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#list li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
    let saved = localStorage.getItem("myTasks");
    if (saved) {
        JSON.parse(saved).forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}
