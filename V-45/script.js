let toDoList = [];

// load to-do list from local storage
window.addEventListener("load", () => {
  loadTaskFromLocalStorage();
});

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

function editTask(task) {
  console.log(task);
  toggleModal("Justera uppgift", "Här kan du byta beskrivning", "edit");
  document.getElementById("editBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const taskInputElement = document.getElementById("modal-input");
    const userInput = taskInputElement.value;
    toDoList[task.id - 1].description = userInput;
    displayTask();
    console.log(toDoList);
  });
}

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

function editTask(task) {
  console.log(task);
  toggleModal("Justera uppgift", "Här kan du byta beskrivning", "edit");
  document.getElementById("editBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const taskInputElement = document.getElementById("modal-input");
    const userInput = taskInputElement.value;
    toDoList[task.id - 1].description = userInput;
    displayTask();
    console.log(toDoList);
  });
}

//Funktion för att lägga till uppgifterna från form
function addTask() {
  const taskInputElement = document.getElementById("task-input");
  const userInput = taskInputElement.value;
  if (!userInput) {
    toggleModal("Du måste skriva någonting, försök igen.");
    return;
  }

  //Loopar genom toDoList-arrayen för att kolla om det finns dubbletter
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].description.toLowerCase() === userInput.toLowerCase()) {
      alert(
        "Du har redan lagt till" +
          " " +
          "'" +
          userInput +
          "'" +
          ", lägg till något annat."
      );
      return;
    }
  }

  const toDo = {
    description: userInput,
    id: toDoList.length + 1,
    done: false,
  };

  toDoList.push(toDo);
  saveTasksToLocalStorage(); // save updated list to local storage
  displayTask(toDo); // Kallar på displayTask(), så att den nya uppgiften visas direkt
  displayTask(); // Kallar på displayTask(), så att den nya uppgiften visas direkt
  taskInputElement.value = ""; // Reset input, så en kan skriva nytt
}

// Function för att skapa element från userinput som visas på skärmen
// function displayTask() {
//   toDoList.forEach((task) => {
//     const container = document.querySelector(".container-task");

//     container.innerHTML = ""; // Clears the container

//     const taskItem = document.createElement("div");
//     taskItem.className = "task-item";

//     const taskDescription = document.createElement("p");
//     taskDescription.className = "task";
//     taskDescription.textContent = task.description;

//     const iconsDiv = document.createElement("div");
//     //Kolla över
//     iconsDiv.className = "icons";

//     const editIcon = document.createElement("i");
//     editIcon.className = "fa-solid fa-edit edit";

//     const checkIcon = document.createElement("i");
//     checkIcon.className = "fa-solid fa-square-check check";

//     const deleteIcon = document.createElement("i");
//     deleteIcon.className = "fa-solid fa-trash-can delete";

//     iconsDiv.appendChild(deleteIcon);
//     iconsDiv.appendChild(checkIcon);
//     iconsDiv.appendChild(editIcon);
//     taskItem.appendChild(taskDescription);
//     taskItem.appendChild(iconsDiv);

//     deleteIcon.addEventListener("click", () => {
//       container.removeChild(taskItem);
//     });

//     checkIcon.addEventListener("click", () => {
//       //  Här vill vi ändra boolean värdet till true och uppdatera stylen till .line-through
//     });

//     container.appendChild(taskItem);
//     editIcon.addEventListener("click", () => {
//       editTask(task);
//     });
//   });
// }
function displayTask() {
  const container = document.querySelector(".container-task");

  // Lägg till en referens till container för slutförda uppgifter
  const completedContainer = document.querySelector(".completed-tasks");
  container.innerHTML = ""; // Rensar så det inte blir dubbletter

  toDoList.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const taskDescription = document.createElement("p");
    taskDescription.className = "task";
    taskDescription.textContent = task.description;

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "icons";

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-edit edit";

    const checkIcon = document.createElement("i");
    checkIcon.className = "fa-solid fa-square-check check";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can delete";

    iconsDiv.appendChild(checkIcon);
    iconsDiv.appendChild(editIcon);
    iconsDiv.appendChild(deleteIcon);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(iconsDiv);
    iconsDiv.appendChild(deleteIcon);
    taskItem.appendChild(checkIcon);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(iconsDiv);

    // changes colour of check form red to green and vice versa
    checkIcon.addEventListener("click", () => {
      if (checkIcon.style.color === "green") {
        checkIcon.style.color = "red";
        task.done = false;
      } else {
        task.done = true;
        checkIcon.style.color = "green";
      }
    });

    //Tar bort både det visuella och uppgiften i arrayen
    deleteIcon.addEventListener("click", () => {
      toDoList = toDoList.filter((item) => item.id !== task.id); // Filtrerar bort uppgiften med matchande id från toDoList-array
      container.removeChild(taskItem);
    });

    checkIcon.addEventListener("click", () => {
      //  Här vill vi ändra boolean värdet till true och uppdatera stylen till .line-through
    });

    editIcon.addEventListener("click", () => {
      editTask(task);
    });
    container.appendChild(taskItem);
  });
}

// Function converts toDoList into a JSON string and saves it in local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// function retrieves the list from the browser's local storage, parses it, and assigns it to toDotList
// it also calls displayTask for each task to display on the page
function loadTaskFromLocalStorage() {
  const storedTask = localStorage.getItem("toDoList");
  if (storedTask) {
    toDoList = JSON.parse(storedTask); // goes through each task
    toDoList.forEach((task) => displayTask(task)); // each task is displayed on the screen
  }
}

// Function converts toDoList into a JSON string and saves it in local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// function retrieves the list from the browser's local storage, parses it, and assigns it to toDotList
// it also calls displayTask for each task to display on the page
function loadTaskFromLocalStorage() {
  const storedTask = localStorage.getItem("toDoList");
  if (storedTask) {
    toDoList = JSON.parse(storedTask); // goes through each task
    toDoList.forEach((task) => displayTask(task)); // each task is displayed on the screen
  }
}

function filtereraTask() {
  let input, filter, container, p, i, txtValue;
  input = document.getElementById("taskfilter");
  filter = input.value.toUpperCase();
  container = document.getElementsByClassName("container-task")[0];
  p = container.getElementsByClassName("task-item");

  for (i = 0; i < p.length; i++) {
    txtValue =
      p[i].querySelector(".task").textContent ||
      p[i].querySelector(".task").innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
}
