let toDoList = [];
let toDoApp = true;
while (toDoApp) {
  let menu = Number(
    prompt(
      "1. Lägg till uppgift. \n2. Visa din lista. \n3. Klarmarkera en uppgift. \n4. Ta bort en uppgift. \n5. Avsluta programmet. "
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
      toDoApp = false;
      break;
    default:
      alert("Gör rätt, skriv en siffra mellan 1-5");
  }

  //Funktion som frågar användare om uppgift sen skapar objekt och lägger in informationen som beskriving i objektet.
  function addTask() {
    let taskInput = true;
    while (taskInput) {
      let userInput = prompt("Lägg till en ny uppgift:");
      if (userInput === null) {
        taskInput = false;
      } else if (userInput.length < 1) {
        alert("Uppgiften får inte vara tom, försök igen.");
      } else {
        const toDo = {
          description: userInput,
          id: toDoList.length,
          done: false,
        };
        toDoList.push(toDo);
        taskInput = confirm("Vill du fortsätta?");
      }
    }
  }

  //Funktion som har en if om ingen uppgift alert, annars alert som mappar ut todolist
  function showList() {
    if (toDoList < 1) {
      alert("Det finns inget att visa ännu, lägg till uppgifter först.");
    } else {
      alert(
        toDoList
          .map((item) => `\n ${item.id + 1}. ${item.description}`)
          .join("")
      );
    }
  }

  function completeTask() {
    let taskCompleted = true;
    while (taskCompleted) {
      if (toDoList.length < 1) {
        alert("Det finns inget att klarmarkera, lägg till uppgifter först.");
        taskCompleted = false;
      } else {
        const selectedTask = Number(
          prompt(
            `Vilken uppgift är du klar med?
        ${toDoList
          .map((item) => `\n ${item.id + 1}. ${item.description}`)
          .join("")}`
          )
        );
        if (!selectedTask) {
          taskCompleted = false;
        } else if (selectedTask >= toDoList.length) {
          alert("Skriv den tillhörande siffran.");
        } else {
          toDoList[selectedTask - 1].done = true;
          alert(
            `${toDoList[selectedTask - 1].description} är nu klarmarkerade.`
          );
          taskCompleted = false;
        }
      }
    }
  }

  //Lös det I DIN EGNA BRANCH (loopar även när den arrayen är tom)

  function removeTask() {
    let taskRemover = true;
    while (taskRemover) {
      if (toDoList.length < 1) {
        alert("Det finns inget att ta bort, lägg till uppgifter först.");
        taskRemover = false;
      } else {
        const selectedTask = Number(
          prompt(
            `Vilken uppgift vill du ta bort?
        ${toDoList
          .map((item) => `\n ${item.id + 1}. ${item.description}`)
          .join("")}`
          )
        );

        if (!selectedTask) {
          taskRemover = false;
        } else if (selectedTask >= toDoList.length + 1) {
          alert("Skriv den tillhörande siffran för uppgiften du vill ta bort.");
        } else {
          if (
            confirm(
              `Är du säker på att du vill ta bort ${
                toDoList[selectedTask - 1].description
              }?`
            )
          ) {
            delete toDoList[selectedTask - 1];
            // taskRemover = false;
          } else {
            taskRemover = false;
          }
        }
      }
    }
  }

  // console.log(toDoList);
}
console.log(toDoList);
