let monsters = [];
const user = {
  name: "",
  team: [],
};
//Async await så datan hinner hämtas innan den uppdateras sen när datan hämtats rendera den
async function fetchMonsters() {
  const response = await fetch("monsters.json");
  monsters = await response.json();
  renderMonsters(".monster-cards-container", monsters, "add");
}

fetchMonsters();
//Funktion som renderar modal där title beskrivning och typ kan ändras
function toggleModal(title, description, monster, type) {
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "flex";

  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = "";

  //Skapar stäng knapp och lägger till eventListener
  const closeButton = document.createElement("button");
  closeButton.id = "close";
  closeButton.textContent = "X";
  modalContent.appendChild(closeButton);
  closeButton.addEventListener("click", handleCloseClick);

  const handleCloseClick = () => {
    modalOverlay.style.display = "none";
  };
  //Sätter titel till modal
  const modalTitle = document.createElement("h4");
  modalTitle.className = "modalTitle";
  modalTitle.textContent = title;
  modalContent.appendChild(modalTitle);

  //Sätter beskrivning till modal
  const modalDescription = document.createElement("p");
  modalDescription.className = "modalDescription";
  modalDescription.textContent = description;
  modalContent.appendChild(modalDescription);

  //Läger till add knapp
  if (type === "add") {
    const teamButton = document.createElement("button");
    teamButton.textContent = "Add to team";
    teamButton.id = "teamBtn";
    modalContent.appendChild(teamButton);

    teamButton.addEventListener("click", () => {
      addMonsterToTeam(monster);
      if (!user.team.some((member) => member.id === monster.id)) {
        modalOverlay.style.display = "none";
      }
    });
  }
  //Lägger till ta bort knapp
  if (type === "remove") {
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove from team";
    removeButton.id = "removeBtn";
    modalContent.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
      removeMonster(monster);
      modalOverlay.style.display = "none";
    });
  }
}
//Renderar monsterna
function renderMonsters(container, render, modalType) {
  const wrapper = document.querySelector(container);
  wrapper.innerHTML = "";
  render.forEach((monster) => {
    //Skapar kort div
    const card = document.createElement("div");
    card.className = "monster-card";

    //Skapar namn
    const cardDescription = document.createElement("h4");
    cardDescription.textContent = monster.name;
    cardDescription.className = "card-name";

    //Skapar beskrivning
    const cardSpecialty = document.createElement("p");
    cardSpecialty.className = "card-specialty";
    cardSpecialty.textContent = monster.specialty;

    //Skapar bilden
    const cardImg = document.createElement("img");
    cardImg.className = "card-img";
    cardImg.src = monster.image;

    //Lägger till komponenterna in i card komponenten som sen är i en wrapper
    card.appendChild(cardDescription);
    card.appendChild(cardImg);
    card.appendChild(cardSpecialty);
    wrapper.appendChild(card);

    card.addEventListener("click", () => {
      toggleModal("Add monster to team", "", monster, modalType);
    });
  });
}

//Function för att lägga till monster i sitt lag
function addMonsterToTeam(monster) {
  if (!user.team.some((member) => member.id === monster.id)) {
    user.team.push(monster);
    localStorage.setItem("userTeam", JSON.stringify(user.team));
  } else {
    //Får inte modalen att trigga? Kan logga både felmeddelande härifrån och från modalen, som funkar på andra ställen.
    console.log("ERROR: Monster already in team");
    toggleModal("Error", "Monster already in team", monster);
  }
  renderMonsters(".cards-container", user.team, "remove");
}
//Funktion för att ta bort monster från sitt lag
function removeMonster(monster) {
  user.team = user.team.filter((item) => item.id !== monster.id);
  localStorage.setItem("userTeam", JSON.stringify(user.team));
  renderMonsters(".cards-container", user.team, "remove");
  //FIXME
  //  else {
  //   toggleModal("Error", "Team does not exist");
  // }
}

//FIXME
function createUser() {}

// Funktion för att ladda in korten från localstorage
function addLocalStorage() {
  const storedTeam = localStorage.getItem("userTeam");
  if (storedTeam) {
    user.team = JSON.parse(storedTeam);
    // Visar korten från localstorage på hemsidan
    renderMonsters(".cards-container", user.team, "remove");
  }
}

addLocalStorage();

// Funktion för att reseta user team
document
  .getElementById("resetButton")
  .addEventListener("click", removeLocalStorage);

function removeLocalStorage() {
  localStorage.removeItem("userTeam");
  user.team = [];
  renderMonsters(".cards-container", user.team, "remove");
}

document.getElementById("createMonster").addEventListener("click", function () {
  const dropdown = document.getElementById("dropdownContent");
  dropdown.classList.toggle("show");
});

//Funktion för att lägga till ett eget monster till user team
function createMonster() {
  const nameInput = document.querySelector(
    "#dropdownContent input[type='text']:nth-of-type(1)"
  );
  const specialtyInput = document.querySelector(
    "#dropdownContent input[type='text']:nth-of-type(2)"
  );
  const imageInput = document.querySelector(
    "#dropdownContent input[type='file']"
  );

  // Skapa unikt id, så att en kan lägga till fler monster
  function generateUniqueId() {
    return "monster-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
  }

  const newMonster = {
    id: generateUniqueId(),
    name: nameInput.value,
    specialty: specialtyInput.value,
    image: "",
  };

  // AI black magic starts
  // Konverterar filen till base64 string, så att det går att spara local
  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    newMonster.image = reader.result; // Set the base64 string as the image

    // AI black magic ends

    // Skickar den skapade monstret till userTeam
    addMonsterToTeam(newMonster);

    // Reset form
    nameInput.value = "";
    specialtyInput.value = "";
    imageInput.value = "";
  };

  //Lite mer AI blackmagic
  if (file) {
    reader.readAsDataURL(file);
  } else {
    addMonsterToTeam(newMonster);
  }
  //Slut på AI blackmagic
}

document
  .querySelector("#dropdownContent form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    createMonster();
  });

function shareGame() {}
