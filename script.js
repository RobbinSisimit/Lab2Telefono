// Obtener elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('task');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('taskList');

// Cargar tareas desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadTasks);

// Función para agregar tarea al formulario
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (taskName) {
        addTask(taskName, priority);
        taskInput.value = ''; // Limpiar el campo de texto
    }
});

// Función para agregar tarea
function addTask(taskName, priority) {
    const task = { name: taskName, priority: priority };
    saveTaskToLocalStorage(task);
    renderTasks(); // Renderizar nuevamente la lista
}

// Función para renderizar la lista de tareas
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar la lista actual
    const tasks = getTasksFromLocalStorage();
    const sortedTasks = sortTasksByPriority(tasks); // Ordenar por prioridad
    sortedTasks.forEach(task => createTaskElement(task));
}

// Función para crear un elemento de tarea
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${task.name} - <strong>${task.priority}</strong>
        <button class="btn btn-warning btn-sm mx-2 editBtn">Editar</button>
        <button class="btn btn-danger btn-sm deleteBtn">Eliminar</button>
    `;
    taskList.appendChild(li);

    // Event listeners para editar y eliminar
    li.querySelector('.editBtn').addEventListener('click', () => editTask(task));
    li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(task));
}

// Función para guardar tarea en localStorage
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para obtener tareas desde localStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Función para guardar todas las tareas en localStorage
function saveAllTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para editar una tarea
function editTask(task) {
    const newName = prompt('Edita la tarea:', task.name);
    const newPriority = prompt('Edita la prioridad (Alta, Media, Baja):', task.priority);
    if (newName && newPriority) {
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.map(t => (t.name === task.name ? { name: newName, priority: newPriority } : t));
        saveAllTasksToLocalStorage(updatedTasks);
        renderTasks();
    }
}

// Función para eliminar una tarea
function deleteTask(task) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(t => t.name !== task.name);
    saveAllTasksToLocalStorage(updatedTasks);
    renderTasks();
}

// Función para ordenar las tareas por prioridad
function sortTasksByPriority(tasks) {
    const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// Función para cargar tareas desde localStorage
function loadTasks() {
    renderTasks();
}
