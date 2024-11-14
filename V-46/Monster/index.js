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

    const cardDescription = document.createElement("h4");
    cardDescription.textContent = monster.name;
    // const cardNameContainer = document.createElement("div");
    cardDescription.className = "card-name";
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
  });
}
