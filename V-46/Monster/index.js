let monsters = [];
let team1 = [];
let team2 = [];
//Async await så datan hinner hämtas innan den uppdateras sen när datan hämtats rendera den
async function fetchMonsters() {
  const response = await fetch("monsters.json");
  monsters = await response.json();
  console.log(monsters);
  renderMonsters();
}
fetchMonsters();

//Funktion som renderar modal där title beskrivning ocg typ kan ändras
function toggleModal(title, description, monster) {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalInput = document.getElementById("modal-input");
  modalOverlay.style.display = "flex";

  const team1Button = document.getElementById("team1Btn");
  const team2Button = document.getElementById("team2Btn");

  const modalTitle = document.getElementById("modalTitle");
  modalTitle.textContent = title;

  const modalDescription = document.getElementById("modalDescription");
  modalDescription.textContent = description;

  closeButton.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  team1Button.addEventListener("click", () => {
    addMonsterToTeam(1, monster);
  });
  team2Button.addEventListener("click", () => {
    addMonsterToTeam(2, monster);
  });
}

function renderMonsters() {
  const container = document.querySelector(".monster-cards-container");
  container.innerHTML = "";
  monsters.forEach((monster) => {
    const card = document.createElement("div");
    card.className = "monster-card";

    const cardDescription = document.createElement("h4");
    cardDescription.textContent = monster.name;
    cardDescription.className = "card-name";
    // const cardNameContainer = document.createElement("div");
    // cardNameContainer.appendChild(cardDescription);
    // const cardName = document.createElement("div");
    // cardName.textContent = "Name:";
    // cardNameContainer.appendChild(cardName);

    const cardSpecialty = document.createElement("p");
    cardSpecialty.className = "card-specialty";
    cardSpecialty.textContent = monster.specialty;
    // const cardSpecialtyContainer = document.createElement("div");
    // cardSpecialtyContainer.appendChild(cardSpecialty);
    // const cardSpecs = document.createElement("div");
    // cardSpecs.textContent = "Specialty:";
    // cardSpecialtyContainer.appendChild(cardSpecs);

    const cardImg = document.createElement("img");
    cardImg.className = "card-img";
    cardImg.src = monster.image;

    card.appendChild(cardDescription);
    card.appendChild(cardImg);
    card.appendChild(cardSpecialty);
    container.appendChild(card);

    card.addEventListener("click", () => {
      toggleModal("Choose a team", "", monster);
    });
  });
}
function addMonsterToTeam(team, monster) {
  //Glöm inte lägga till localstorage
  console.log("team:", team, "Monster:", monster);
  team === 1
    ? team1.push(monster)
    : team === 2
    ? team2.push(monster)
    : toggleModal("Error", "Team does not exist");
  console.log(team1);
  console.log(team2);
}
function removeMonster() {
  //Glöm inte ta bort localstorage
}

function addLocalStorage() {}

function removeLocalStorage() {}

function createMonster() {}

function shareGame() {}
