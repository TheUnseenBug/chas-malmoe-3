let toDoList = [];
const taskContainer = document.querySelector('.container-task');
const addButton = document.getElementById('add');
const taskInput = document.querySelector('.task-input');

// Lägg till en uppgift
addButton.addEventListener('click', (event) => {
  event.preventDefault(); // Förhindra formulärsändning
  const userInput = taskInput.value.trim();
  
  if (userInput.length < 1) {
    alert("Du måste skriva någonting, försök igen.");
    return;
  }

  const toDo = {
    description: userInput,
    id: toDoList.length,
    done: false,
  };
  
  toDoList.push(toDo);
  taskInput.value = ''; // Rensa inputfältet
  renderTasks();
});

// Rendera uppgifter
function renderTasks() {
  taskContainer.innerHTML = ''; // Rensa tidigare uppgifter
  toDoList.forEach((item) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <i class="fa-solid fa-square-check check" onclick="completeTask(${item.id})"></i>
      <p class="task ${item.done ? 'checked-task' : ''}">${item.description}</p>
      <div class="icons">
        <i class="fa-solid fa-trash-can delete" onclick="removeTask(${item.id})"></i>
      </div>
    `;
    taskContainer.appendChild(taskItem);
  });
}

// Klarmarkera en uppgift
function completeTask(id) {
  toDoList[id].done = true;
  renderTasks();
}

// Ta bort en uppgift
function removeTask(id) {
  if (confirm(`Är du säker på att du vill ta bort ${toDoList[id].description}?`)) {
    toDoList.splice(id, 1); // Ta bort uppgiften från listan
    renderTasks();
  }
}
