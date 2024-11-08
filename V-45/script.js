let toDoList = [];

// Hämtar button från HTML, triggar addTask() när den klickas på
document.getElementById("addBtn").addEventListener("click", (event) => {
  event.preventDefault(); // Tack Mandus
  addTask();
  console.log(toDoList);
});

function toggleModal(title, description, type) {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalInput = document.getElementById("modal-input");
  modalOverlay.style.display = "flex";

  const modalTitle = document.getElementById("modalTitle");
  modalTitle.textContent = title;

  const modalDescription = document.getElementById("modalDescription");
  modalDescription.textContent = description;

  closeButton.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  if (type !== "edit") {
    modalInput.style.display = "none";
  }
  if (type === "edit") {
    modalInput.style.display = "block";
  }
}

function editTask() {
  toggleModal("Justera uppgift", "Här kan du byta beskrivning", "edit");
  // const taskInputElement = document.querySelector(".modal-input");
  // const userInput = taskInputElement.value;
}

function addTask() {
  const taskInputElement = document.querySelector(".task-input");
  const userInput = taskInputElement.value;
  console.log(taskInputElement.value);
  if (!userInput) {
    toggleModal("Du måste skriva någonting, försök igen.");
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

  const taskDescription = document.createElement("p");
  taskDescription.className = "task";
  taskDescription.textContent = task.description;

  const iconsDiv = document.createElement("div");
  //Kolla över
  iconsDiv.className = "icons";

  const editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-edit edit";

  const checkIcon = document.createElement("i");
  checkIcon.className = "fa-solid fa-square-check check";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash-can delete";

  iconsDiv.appendChild(deleteIcon);
  iconsDiv.appendChild(checkIcon);
  iconsDiv.appendChild(editIcon);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(iconsDiv);

  deleteIcon.addEventListener("click", () => {
    container.removeChild(taskItem);
  });

  checkIcon.addEventListener("click", () => {
    //  Här vill vi ändra boolean värdet till true och uppdatera stylen till .line-through
  });

  container.appendChild(taskItem);
  editIcon.addEventListener("click", () => {
    editTask();
  });
}
