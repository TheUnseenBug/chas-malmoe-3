let monsters = [];
//Async await så datan hinner hämtas innan den uppdateras sen när datan hämtats rendera den
async function fetchMonsters() {
  const response = await fetch("monsters.json");
  monsters = await response.json();
  console.log(monsters);
  renderMonsters();
}
fetchMonsters();
function renderMonsters() {
  const container = document.querySelector(".monster-cards-container");
  container.innerHTML = "";
  monsters.forEach((monster) => {
    const card = document.createElement("div");
    card.className = "monster-card";

    const cardNameContainer = document.createElement("div");
    cardNameContainer.className = "card-name";
    const cardDescription = document.createElement("div");
    cardDescription.textContent = monster.name;
    cardNameContainer.appendChild(cardDescription);
    // const cardName = document.createElement("div");
    // cardName.textContent = "Name:";
    // cardNameContainer.appendChild(cardName);

    const cardSpecialtyContainer = document.createElement("div");
    cardSpecialtyContainer.className = "card-specialty";
    const cardSpecialty = document.createElement("div");
    cardSpecialty.textContent = monster.specialty;
    cardSpecialtyContainer.appendChild(cardSpecialty);
    // const cardSpecs = document.createElement("div");
    // cardSpecs.textContent = "Specialty:";
    // cardSpecialtyContainer.appendChild(cardSpecs);

    const cardImg = document.createElement("img");
    cardImg.className = "card-img";
    cardImg.src = monster.image;

    card.appendChild(cardImg);
    card.appendChild(cardNameContainer);
    card.appendChild(cardSpecialtyContainer);
    container.appendChild(card);
  });
}
