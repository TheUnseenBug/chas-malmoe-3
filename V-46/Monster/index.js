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
  const closeButton = document.createElement("button");
  closeButton.id = "close";
  closeButton.textContent = "X";
  modalContent.appendChild(closeButton);
  const handleCloseClick = () => {
    modalOverlay.style.display = "none";
  };
  closeButton.addEventListener("click", handleCloseClick);
  const modalTitle = document.createElement("h4");
  modalTitle.className = "modalTitle";
  modalTitle.textContent = title;
  const modalDescription = document.createElement("p");
  modalDescription.className = "modalDescription";
  modalDescription.textContent = description;
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDescription);

  if (type === "add") {
    const teamButton = document.createElement("button");
    teamButton.textContent = "Add to team";
    teamButton.id = "teamBtn";
    modalContent.appendChild(teamButton);

    teamButton.addEventListener("click", () => {
      addMonsterToTeam(monster);
      modalOverlay.style.display = "none";
    });
  }

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

function renderMonsters(container, render, modalType) {
  const wrapper = document.querySelector(container);
  wrapper.innerHTML = "";
  render.forEach((monster) => {
    const card = document.createElement("div");
    card.className = "monster-card";

    const cardDescription = document.createElement("h4");
    cardDescription.textContent = monster.name;
    cardDescription.className = "card-name";

    const cardSpecialty = document.createElement("p");
    cardSpecialty.className = "card-specialty";
    cardSpecialty.textContent = monster.specialty;

    const cardImg = document.createElement("img");
    cardImg.className = "card-img";
    cardImg.src = monster.image;

    card.appendChild(cardDescription);
    card.appendChild(cardImg);
    card.appendChild(cardSpecialty);
    wrapper.appendChild(card);

    card.addEventListener("click", () => {
      toggleModal("Add monster to team", "", monster, modalType);
    });
  });
}
function addMonsterToTeam(monster) {
  //Glöm inte lägga till localstorage
  if (!user.team.some((member) => member.id === monster.id)) {
    user.team.push(monster);
  } else {
    //FIXME
    //   toggleModal("Error", "Monster already in team");
  }
  renderMonsters(".cards-container", user.team, "remove");
}

function removeMonster(monster) {
  // Glöm inte ta bort localstorage
  user.team = user.team.filter((item) => item.id !== monster.id);
  renderMonsters(".cards-container", user.team, "remove");
  //FIXME
  //  else {
  //   toggleModal("Error", "Team does not exist");
  // }
}
//FIXME
function createUser() {}

//FIXME
function addLocalStorage() {}

//FIXME
function removeLocalStorage() {}

function createMonster() {}

function shareGame() {}
