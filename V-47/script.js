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

function displayNews(response) {
  const newsFeed = document.getElementById("newsFeed"); // Hämtar newsFeed-elementet

  response.articles.forEach((article) => {
    const newsArticle = document.createElement("article"); // Skapar ett nytt artikel-element
    newsArticle.classList.add("newsArticle"); // Lägger till klassen "newsArticle"
    
    const imgElement = document.createElement("img");
    imgElement.src = article.urlToImage;
    imgElement.classList.add("newsImg");
    imgElement.style.width = "100%";
    imgElement.style.height = "auto";
    newsArticle.appendChild(imgElement);

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

    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Mark as favorite "; // Kort beskrivning
    favoriteButton.classList.add("favoriteButton");
    newsArticle.appendChild(favoriteButton);

 // Gör hela artikeln klickbar och leder till den fullständiga artikeln
    newsArticle.addEventListener("click", () => {
          window.open(article.url, "_blank"); // Öppnar artikeln i en ny flik
        });

    newsFeed.appendChild(newsArticle); // Lägger till artikeln i newsFeed

    newsArticle.addEventListener("click", () => {
      handleFavorite(article);
    });
  });
}

function populateSourceFilter() {
  const sourceFilter = document.getElementById("sourceFilter");
  const sources = [...new Set(news.map((article) => article.source.name))]; // Unique sources

  sourceFilter.innerHTML = '<option value="">All Sources</option>'; // Reset options
  sources.forEach((source) => {
    const option = document.createElement("option");
    option.value = source;
    option.textContent = source;
    sourceFilter.appendChild(option);
  });
}

function filterBySource() {
  const selectedSource = document.getElementById("sourceFilter").value;
  const filteredNews = selectedSource
    ? news.filter((article) => article.source.name === selectedSource)
    : news; // Show all if no source selected

  displayNews(filteredNews);
}

function categoryNews() {}

function handleFavorite(article) {
  console.log(article);
  if (favoriteNews.includes(article)) {
    console.log("first");
    favoriteNews.filter((a) => a.id !== article.id);
  } else {
    console.log("second");
    favoriteNews.push(article);
    console.log(favoriteNews);
  }
}
console.log(favoriteNews);

function handleFavorite(article) {
  console.log(article);
  if (favoriteNews.includes(article)) {
    console.log("first");
    favoriteNews.filter((a) => a.id !== article.id);
  } else {
    console.log("second");
    favoriteNews.push(article);
    console.log(favoriteNews);
  }
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", searchNews);

function searchNews() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const container = document.getElementById('newsFeed');

  try {
    container.innerHTML = '';

    if (!searchTerm) {
      displayNews(news);
      return;
    }

    const searchedNews = news.articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      (article.description && article.description.toLowerCase().includes(searchTerm))

    );

    if (searchedNews.length === 0) {
      container.innerHTML = "<p>Nothing matched your search terms...</p>";
      return;
    }

    searchedNews.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      articleElement.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      container.appendChild(articleElement);

    });
  } catch (error) {
    console.error("Error searching news:", error);
    container.innerHTML = "<p>Error loading news articles</p>";
  }
}
function pagination() {}
