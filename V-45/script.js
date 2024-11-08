let toDoList = [];

// Hämtar button från HTML, triggar addTask() när den klickas på
document.getElementById("addBtn").addEventListener("click", (event) => {
  event.preventDefault(); // Tack Mandus
  addTask();
  console.log(toDoList);
});

//Funktion för att lägga till uppgifterna från form
function addTask() {
  const taskInputElement = document.querySelector(".task-input");
  const userInput = taskInputElement.value;

  if (!userInput) {
    alert("Du måste skriva någonting, försök igen.");
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
  displayTask(toDo); // Kallar på displayTask(), så att den nya uppgiften visas direkt
  taskInputElement.value = ""; // Reset input, så en kan skriva nytt
}

// Function för att skapa element från userinput som visas på skärmen
function displayTask(task) {
  const container = document.querySelector(".container-task");

  // Lägg till en referens till container för slutförda uppgifter
  const completedContainer = document.querySelector(".completed-tasks");

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

  container.appendChild(taskItem);
}

function filtereraTask() {
  let input, filter, container, p, i, txtValue;
  input = document.getElementById("taskfilter");
  filter = input.value.toUpperCase();
  container = document.getElementsByClassName("container-task")[0];
  p = container.getElementsByClassName('task-item');

  for (i = 0; i < p.length; i++) {
      txtValue = p[i].querySelector(".task").textContent || p[i].querySelector(".task").innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          p[i].style.display = "";
      } else {
          p[i].style.display = "none";
      }
  }
}