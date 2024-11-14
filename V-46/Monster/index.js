let monsters = [];
//Async await så datan hinner hämtas innan den uppdateras
async function fetchMonsters() {
  const response = await fetch("monsters.json");
  monsters = await response.json();
  console.log(monsters);
}
fetchMonsters();
function renderMonsters() {
  const container = document.querySelector(".monster-cards-container");
  // container.innerHTML = "";
  monsters.forEach((monster) => {
    const card = document.createElement("div");
    card.className = "monster-card";
  });
}
renderMonsters();
