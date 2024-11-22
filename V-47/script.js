let favoriteNews = [];
async function fetchNews(page, category) {
  try {
    const apiKey = "db6c1d2353eb42528700f136fd8899fb";
    // const url = `https://newsapi.org/v2/top-headlines?country=us${
    //   category ? `&category=${category}` : ""
    // }&page=${page}&apiKey=${apiKey}`;
    const url = "test.json";
    const data = await fetch(url);
    const response = await data.json();
    console.log(response);
    displayNews(response);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchNews();
function displayNews(news) {
  const newsFeed = document.getElementById("newsFeed"); // Hämtar newsFeed-elementet
  news.articles.forEach((article) => {
    const newsArticle = document.createElement("article"); // Skapar ett nytt artikel-element
    newsArticle.classList.add("newsArticle"); // Lägger till klassen "newsArticle"

    // Skapar och lägger till titeln
    const titleElement = document.createElement("h2");
    titleElement.textContent = article.title;
    newsArticle.appendChild(titleElement);

    // Skapar och lägger till beskrivningen
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description; // Kort beskrivning
    newsArticle.appendChild(descriptionElement);

    // Skapar och lägger till källa eller författare
    const sourceElement = document.createElement("p");
    sourceElement.textContent = article.source.name; // Källa
    newsArticle.appendChild(sourceElement);

    // Skapar och lägger till källa eller författare
    const favorite = document.createElement("button");
    favorite.textContent = "älskar"; // Källa
    newsArticle.appendChild(favorite);

    newsFeed.appendChild(newsArticle); // Lägger till artikeln i newsFeed

    favorite.addEventListener("click", () => {
      handleFavorite(article);
    });
  });
}
function filterNews() {
  //???????
}

function categoryNews() {}

function handleFavorite(article) {
  if (favoriteNews.includes(article)) {
    favoriteNews.filter((a) => a.id !== article.id);
  } else {
    favoriteNews.push(article);
  }
}
console.log(favoriteNews);
function searchNews() {}

function pagination() {}
