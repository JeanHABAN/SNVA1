let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        input.value = ''; 
        renderTasks();
    }
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks() {
    const filter = document.getElementById('filter').value;
    renderTasks(filter);
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed)) {
            const taskItem = document.createElement('li');
            task.completed ? taskItem.classList.add('completed') : taskItem.classList.remove('completed');
            taskItem.textContent = task.text;

            // Completion toggle
            taskItem.addEventListener('click', () => toggleCompletion(index));

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent toggling completion when clicking delete
                deleteTask(index);
            });
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', renderTasks);
