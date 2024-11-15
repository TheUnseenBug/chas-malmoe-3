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
console.log(user.team);
//Funktion som renderar modal där title beskrivning och typ kan ändras
function toggleModal(title, description, monster, type) {
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "flex";

  const modalContent = document.getElementById("modalContent");
  const closeButton = document.getElementById("closeButton");

  modalContent.innerHTML = "";
  //FIXME
  // const modalTitle = document.getElementById("modalTitle");
  // modalTitle.textContent = title;
  // const modalDescription = document.getElementById("modalDescription");
  // modalDescription.textContent = description;

  const handleCloseClick = () => {
    modalOverlay.style.display = "none";
  };
  //FIXME
  // const newCloseButton = closeButton.cloneNode(true);
  // closeButton.replaceWith(newCloseButton);
  // closeButton.addEventListener("click", handleCloseClick);

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
      toggleModal("Choose a team", "", monster, modalType);
    });
  });
}
function addMonsterToTeam(monster) {
  //Glöm inte lägga till localstorage
  console.log(!user.team.includes(monster));
  if (!user.team.some((member) => member.id === monster.id)) {
    console.log("first");
    user.team.push(monster);
  } else {
    //FIXME
    //   toggleModal("Error", "Monster already in team");
  }
  renderMonsters("#team-left", user.team, "remove");
}

function removeMonster(monster) {
  // Glöm inte ta bort localstorage
  user.team = user.team.filter((item) => item.id !== monster.id);
  renderMonsters("#team-left", user.team, "remove");
  //FIXME
  //  else {
  //   toggleModal("Error", "Team does not exist");
  // }
}

//FIXME
function addLocalStorage() {}
//FIXME
function removeLocalStorage() {}

function createMonster() {}
//FIXME
function createUser() {}

function shareGame() {}
