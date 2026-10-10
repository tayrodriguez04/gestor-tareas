let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditing = false;

const taskForm = document.getElementById("taskForm");
const taskIdInput = document.getElementById("taskId");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancelEdit = document.getElementById("btnCancelEdit");
const formTitle = document.getElementById("formTitle");

const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const filterStatus = document.getElementById("filterStatus");
const filterCategory = document.getElementById("filterCategory");

taskDate.min = new Date().toISOString().split("T")[0];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isOverdue(task) {
    if (!task.date || task.completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return task.date < today;
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const titleValue = taskTitle.value.trim();
    if (titleValue.length < 3) {
        alert("El título debe tener al menos 3 caracteres.");
        return;
    }

    if (isEditing) {
        const idToEdit = taskIdInput.value;
        tasks = tasks.map(task => {
            if (task.id === idToEdit) {
                return {
                    ...task,
                    title: titleValue,
                    description: taskDescription.value.trim(),
                    category: taskCategory.value,
                    priority: taskPriority.value,
                    date: taskDate.value,
                    updatedAt: new Date().toISOString()
                };
            }
            return task;
        });
        resetForm();
    } else {
        const newTask = {
            id: crypto.randomUUID(),
            title: titleValue,
            description: taskDescription.value.trim(),
            category: taskCategory.value,
            priority: taskPriority.value,
            date: taskDate.value,
            completed: false,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
    }

    saveTasks();
    taskForm.reset();
    renderTasks();
});

btnCancelEdit.addEventListener("click", resetForm);

function resetForm() {
    isEditing = false;
    taskIdInput.value = "";
    taskForm.reset();
    formTitle.textContent = "Nueva Tarea";
    btnSubmit.textContent = "Agregar Tarea";
    btnCancelEdit.classList.add("hidden");
}

function startEditTask(task) {
    isEditing = true;
    taskIdInput.value = task.id;
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskCategory.value = task.category;
    taskPriority.value = task.priority;
    taskDate.value = task.date;

    formTitle.textContent = "Editar Tarea";
    btnSubmit.textContent = "Guardar Cambios";
    btnCancelEdit.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}

function createTaskElement(task) {
    const article = document.createElement("article");
    const overdue = isOverdue(task);

    let className = "task";
    if (task.completed) className += " completed";
    if (overdue) className += " overdue";
    article.className = className;

    const contentDiv = document.createElement("div");
    contentDiv.className = "task-content";

    const titleHeading = document.createElement("h3");
    titleHeading.textContent = task.title;

    const descParagraph = document.createElement("p");
    descParagraph.textContent = task.description || "Sin descripción";

    const infoDiv = document.createElement("div");
    infoDiv.className = "task-info";

    const catBadge = document.createElement("span");
    catBadge.className = "badge category";
    catBadge.textContent = task.category || "General";

    const prioBadge = document.createElement("span");
    prioBadge.className = `badge priority-${task.priority}`;
    prioBadge.textContent = `Prioridad: ${task.priority.toUpperCase()}`;

    const dateSpan = document.createElement("span");
    dateSpan.textContent = task.date ? `Fecha: ${task.date}` : "Sin fecha límite";

    infoDiv.append(catBadge, prioBadge, dateSpan);

    if (overdue) {
        const overdueTag = document.createElement("span");
        overdueTag.className = "badge error";
        overdueTag.textContent = "¡VENCIDA!";
        infoDiv.appendChild(overdueTag);
    }

    contentDiv.append(titleHeading, descParagraph, infoDiv);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const btnToggle = document.createElement("button");
    btnToggle.textContent = task.completed ? "Reabrir" : "Completar";
    btnToggle.className = "btn-toggle";
    btnToggle.addEventListener("click", () => toggleTask(task.id));

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.className = "btn-edit";
    btnEdit.addEventListener("click", () => startEditTask(task));

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Eliminar";
    btnDelete.className = "btn-delete";
    btnDelete.addEventListener("click", () => deleteTask(task.id));

    actionsDiv.append(btnToggle, btnEdit, btnDelete);
    article.append(contentDiv, actionsDiv);

    return article;
}

function renderTasks() {
    taskList.innerHTML = "";

    const search = searchTask.value.toLowerCase().trim();
    const statusFilter = filterStatus.value;
    const categoryFilter = filterCategory.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search) || 
                              task.description.toLowerCase().includes(search);

        const overdue = isOverdue(task);
        let matchesStatus = true;
        if (statusFilter === "pending") matchesStatus = !task.completed;
        if (statusFilter === "completed") matchesStatus = task.completed;
        if (statusFilter === "overdue") matchesStatus = overdue;

        const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    if (filteredTasks.length === 0) {
        const emptyParagraph = document.createElement("p");
        emptyParagraph.className = "empty";
        emptyParagraph.textContent = "No se encontraron tareas con los filtros seleccionados.";
        taskList.appendChild(emptyParagraph);
        updateStatistics();
        return;
    }

    filteredTasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });

    updateStatistics();
}

function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}

searchTask.addEventListener("input", renderTasks);
filterStatus.addEventListener("change", renderTasks);
filterCategory.addEventListener("change", renderTasks);

renderTasks();