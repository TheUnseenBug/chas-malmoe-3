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

function filtereraTask() {
    let input, filter, ul, li, i, txtValue;
    input = document.getElementById("taskfilter");
    filter = input.value.toUpperCase();
    ul = document.getElementById("todoList");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        // Hämta textinnehållet direkt från <li>-elementet
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


document.getElementById('addTaskBtn').onclick = addTask;