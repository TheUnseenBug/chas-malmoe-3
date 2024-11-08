let toDoList = [];

// Hämtar button från HTML, triggar addTask() när den klickas på
document.getElementById("addBtn").addEventListener("click", (event) => {
  event.preventDefault(); // Tack Mandus
  addTask();
  console.log(toDoList);
});

function addTask() {
  const taskInputElement = document.querySelector(".task-input");
  const userInput = taskInputElement.value;

  if (!userInput) {
    alert("Du måste skriva någonting, försök igen.");
    return;
  }

  const toDo = {
    description: userInput,
    id: toDoList.length + 1,
    done: false,
  };
  toDoList.push(toDo);
  displayTask(toDo); // Kallar på displayTask(), så att den nya uppgiften visas direkt
  taskInputElement.value = ""; // Reset input, så en kan skriva nytt
}

function displayTask(task) {
  const container = document.querySelector(".container-task");

  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  const checkIcon = document.createElement("i");
  checkIcon.className = "fa-solid fa-square-check check";

  const taskDescription = document.createElement("p");
  taskDescription.className = "task";
  taskDescription.textContent = task.description;

  const iconsDiv = document.createElement("div");
  iconsDiv.className = "icons";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash-can delete";

  iconsDiv.appendChild(deleteIcon);

  taskItem.appendChild(checkIcon);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(iconsDiv);

  checkIcon.addEventListener('click', () => {
    if (checkIcon.style.color === 'green') {
      checkIcon.style.color = 'red';
    } else {
      checkIcon.style.color = 'green';
    }
  });

  deleteIcon.addEventListener("click", () => {
    container.removeChild(taskItem);
  });

  checkIcon.addEventListener("click", () => {
    //  Här vill vi ändra boolean värdet till true och uppdatera stylen till .line-through
  });

  container.appendChild(taskItem);
}
