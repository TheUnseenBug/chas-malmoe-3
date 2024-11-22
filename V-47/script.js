let news = [];
async function fetchNews(page, category) {
  try {
    const apiKey = "db6c1d2353eb42528700f136fd8899fb";
    const url = `https://newsapi.org/v2/top-headlines?country=us${
      category ? `&category=${category}` : ""
    }&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(url);
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

    newsFeed.appendChild(newsArticle); // Lägger till artikeln i newsFeed
  });
}

function filterNews() {
  //???????
}

function categoryNews() {}

function favoriteNews() {}

const searchInput = document.getElementById('search-input'); 
searchInput.addEventListener('input', searchNews);

async function searchNews() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const container = document.getElementById('newsFeed');

  try {
    const response = await fetchNews(1); //page one is default
    const articles = news.articles; // using global news array

    container.innerHTML = '';

    if (!searchTerm) {
      displayNews(news);
      return;
    }

    const searchedNews = articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      (article.description && article.description.toLowerCase().includes(searchTerm))
    );

    if (searchedNews.length === 0) {
      container.innerHTML = '<p>Nothing matched your search terms...</p>';
      return;
    }

    searchedNews.forEach(article => {
      console.log(article);
      // const articleElement = document.createElement('div');
      // articleElement.classList.add('article');
      // articleElement.innerHTML = `
      //   <h3>${article.title}</h3>
      //   <p>${article.description}</p>
      //   <a href="${article.url}" target="_blank">Read more</a>
      // `;
      // container.appendChild(articleElement);
    });

  } catch (error) {
    console.error("Error searching news:", error);
    container.innerHTML = '<p>Error loading news articles</p>';
  }
}


function pagination() {}
