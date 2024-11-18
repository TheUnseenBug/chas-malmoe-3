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

//Function för att lägga till monster i sitt lag
function addMonsterToTeam(monster) {
  if (!user.team.some((member) => member.id === monster.id)) {
    user.team.push(monster);
    localStorage.setItem("userTeam", JSON.stringify(user.team));
  } else {
    //FIXME
    //Får inte modalen att trigga? Kan logga både felmeddelande härifrån och från modalen, som funkar på andra ställen.
    console.log("ERROR: Monster already in team");
    toggleModal("Error", "Monster already in team", null, null);
  }
  renderMonsters(".cards-container", user.team, "remove");
}

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

  const newMonster = {
    name: nameInput.value,
    specialty: specialtyInput.value,
    image: "",
  };

  // Convert the image file to a base64 string, blackmagic
  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    newMonster.image = reader.result; // Set the base64 string as the image

    // Add the new monster to the team and save to local storage
    addMonsterToTeam(newMonster);

    // Clear the form inputs
    nameInput.value = "";
    specialtyInput.value = "";
    imageInput.value = "";
  };

  if (file) {
    reader.readAsDataURL(file); // Read the file as a data URL
  } else {
    // If no file is selected, add the monster without an image
    addMonsterToTeam(newMonster);
  }
}

// Add event listener to the form submission
document
  .querySelector("#dropdownContent form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    createMonster();
  });

function shareGame() {}
