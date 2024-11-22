let favoriteNews = [];
let news = [];
async function fetchNews(page, category) {
  try {
    const apiKey = "db6c1d2353eb42528700f136fd8899fb";
    // const url = `https://newsapi.org/v2/top-headlines?country=us${
    //   category ? `&category=${category}` : ""
    // }&page=${page}&apiKey=${apiKey}`;
    const url = "test.json";
    const data = await fetch(url);
    const response = await data.json();
    news = response.articles;
    console.log(response);
    displayNews(response);
    populateSourceFilter();
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
    const titleElement = document.createElement("h3");
    titleElement.textContent = article.title;
    titleElement.classList.add("newsTitle");
    newsArticle.appendChild(titleElement);

    // Skapar och lägger till beskrivningen
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description; // Kort beskrivning
    descriptionElement.classList.add("newsDescription");
    newsArticle.appendChild(descriptionElement);

    // Skapar och lägger till författare
    const sourceElement = document.createElement("p");
    sourceElement.textContent = "Published on: " + article.source.name; // Källa
    sourceElement.classList.add("newsSource");
    newsArticle.appendChild(sourceElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = "Written by: " + article.author; // Källa
    authorElement.classList.add("newsAuthor");
    newsArticle.appendChild(authorElement);

    // Skapar och lägger till read full story med länk till nyhetens url
    const readMore = document.createElement("a");
    readMore.href = article.url; // Korrekt länk till nyheten
    readMore.target = "_blank"; // Öppnar länken i en ny flik
    readMore.textContent = "Read full story"; // Text för länken
    readMore.classList.add("readMore");
    newsArticle.appendChild(readMore); // Lägger till länken i artikeln

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

function favoriteNews() {}

function searchNews() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const container = document.getElementById('newsFeed');
  
  // Clear the container
  container.innerHTML = '';
  
  // If search is empty, show all news
  if (!searchInput) {
      displayNews(news);
      return;
  }
  
  // Filter articles based on title
  const filteredArticles = news.articles.filter(article => 
      article.title.toLowerCase().includes(searchInput)
  );
  
  // Display message if no results found
  if (filteredArticles.length === 0) {
      container.innerHTML = '<p>No articles found matching your search.</p>';
      return;
  }
  
  // Display filtered articles
  filteredArticles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      articleElement.innerHTML = `
          <img src="${article.urlToImage || 'placeholder-image.jpg'}" alt="Article image">
          <h3>${article.title}</h3>
          <p>${article.description || 'No description available'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
      `;
      container.appendChild(articleElement);
  });
}

// Add event listener to search input
document.getElementById('search-input').addEventListener('input', searchNews);

function pagination() {}
