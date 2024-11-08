let toDo = [];

function rendertasks() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    toDo.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Ta bort';
        removeBtn.onclick = () => {
            removeTask(index);
        }

        li.appendChild(removeBtn);
        todoList.appendChild(li);
    
});

}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value;
     
     if (newTask) {
        toDo.push(newTask);
        taskInput.value = '';
        rendertasks();
     }

}



function removeTask(index) {
    toDo.splice(index, 1);
    rendertasks();
}

document.getElementById('addTaskBtn').onclick = addTask;