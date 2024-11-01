let toDoList = [];

let menu = Number(
  prompt(
    "1. Lägg till uppgift. \n2.Visa din lista. \n3. Klarmarkera en uppgift. \n4. Ta bort en uppgift. \n5. Avsluta programmet. "
  )
);

switch (menu) {
  case 1:
    addTask();
    break;
  case 2:
    showList();
    break;
  case 3:
    completeTask();
    break;
  case 4:
    removeTask();
    break;
  case 5:
    alert("Tack för att du gjort en ToDo-lista :)");
    break;
  default:
    alert("Gör rätt, 1-5");
}

function addTask() {
  let taskInput = true;
  while (taskInput) {
    let userInput = prompt("Lägg till en ny uppgift:");

    const toDo = { description: userInput, id: toDoList.length, done: false };
    toDoList.push(toDo);
    taskInput = confirm("Vill du fortsätta?");
  }
}
// addTask();

// Variabel till showlist för alert ELLER prompt
function showList() {
  toDoList.map((item) => alert(`${item.id + 1}. ${item.description}`));
  console.log(toDoList);
}

// showList();

function completeTask() {
  const selectedTask = prompt(
    toDoList.map(
      (item) =>
        `Vilken uppgift är du klar med? \n${item.id}. ${item.description}`
    )
  );
  confirm((toDoList[selectedTask].done = true));
  console.log(toDoList);
}

// completeTask();

function removeTask() {
  const selectedTask = prompt(
    toDoList.map(
      (item) =>
        `Vilken uppgift vill du ta bort? \n${item.id}. ${item.description}`
    )
  );

  confirm("Är du säker på att du vill ta bort den uppgiften?")
    ? delete toDoList[selectedTask]
    : "Du slipper."; //skapa return till menyn
}

// removeTask();
console.log(toDoList);
