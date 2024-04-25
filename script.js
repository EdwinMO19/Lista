 
const taskList = document.getElementById("taskList");

// Función para agregar una nueva tarea
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskItem.className = "task-item";
    taskItem.onclick = toggleTask;
    taskList.appendChild(taskItem);
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Por favor ingresa una tarea válida");
  }
}

// Función para marcar una tarea como completada o incompleta
function toggleTask() {
  this.classList.toggle("task-completed");
  saveTasks();
}

// Función para guardar las tareas en el almacenamiento local del navegador
function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach(taskItem => {
    tasks.push({
      text: taskItem.textContent,
      completed: taskItem.classList.contains("task-completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para cargar las tareas desde el almacenamiento local del navegador
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.text;
    taskItem.className = "task-item";
    if (task.completed) {
      taskItem.classList.add("task-completed");
    }
    taskItem.onclick = toggleTask;
    taskList.appendChild(taskItem);
  });
}


// Cargar las tareas al cargar la página
loadTasks();
