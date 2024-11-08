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

// Funktion för att klona templete från HTML. Tar text-input från form och sätter in den i container-diven för nya uppgifter
function displayTask(toDoItem) {
  // Hämtar div-container från html
  const container = document.querySelector(".container-task");

  // Hämtar template-elementet med id "task-item-template" och klonar dess innehåll. Black magic, typ.
  const taskItem = document
    .getElementById("task-item-template")
    .content.cloneNode(true);

  // Sätter textinnehållet i .task från form-inputen till beskrivningen av uppgiften. Dvs det en skriver.
  taskItem.querySelector(".task").textContent = toDoItem.description;

  // Lägger till hela klonade paketet i containern
  container.appendChild(taskItem);
}
