const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", searchNews);
let favoriteNews = [];
let news = [];
async function fetchNews(page, category) {
  try {
    const apiKey = "db6c1d2353eb42528700f136fd8899fb";
    const url = `https://newsapi.org/v2/top-headlines?country=us${
      category ? `&category=${category}` : ""
    }&page=${page}&apiKey=${apiKey}`;
    // const url = "test.json";
    const data = await fetch(url);
    const response = await data.json();

    // Filtrerar bort borttagna artiklar, så att de inte laddas in
    const filteredArticles = response.articles.filter(
      (article) => article.source.name !== "[Removed]"
    );
    response.articles = filteredArticles;

    news = response;
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
  newsFeed.innerHTML = ""; // Tömmer containern innan något läggs till

  response.articles.forEach((article) => {
    const newsArticle = document.createElement("article"); // Skapar ett nytt artikel-element
    newsArticle.classList.add("newsArticle"); // Lägger till klassen "newsArticle"

    // Skapar och lägger till publiceringsdatum och tid
    const dateElement = document.createElement("p");
    const publishedDate = new Date(article.publishedAt); // Skapar ett Date-objekt
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Stockholm' }; // Formatinställningar med svensk tid
    dateElement.textContent = publishedDate.toLocaleString('en-US', options); // Formaterar datum och tid på engelska
    dateElement.classList.add("newsDate");
    newsArticle.appendChild(dateElement);

    // Skapar och lägger till titeln
    const titleElement = document.createElement("h3");
    titleElement.textContent = article.title;
    titleElement.classList.add("newsTitle");
    newsArticle.appendChild(titleElement);

    const imgElement = document.createElement("img");
    imgElement.src = article.urlToImage;
    imgElement.classList.add("newsImg");
    imgElement.style.width = "100%";
    imgElement.style.height = "auto";
    newsArticle.appendChild(imgElement);

    // Gör  bilden klickbar och leder till den fullständiga artikeln
    imgElement.addEventListener("click", (event) => {
      window.open(article.url, "_blank"); // Öppnar artikeln i en ny flik
    });

    // Skapar och lägger till beskrivningen
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description; // Kort beskrivning
    descriptionElement.classList.add("newsDescription");
    newsArticle.appendChild(descriptionElement);

    const sourceContainer = document.createElement("section");
    sourceContainer.className = "source-container";
    newsArticle.appendChild(sourceContainer);

    // Skapar och lägger till författare
    const sourceElement = document.createElement("p");
    sourceElement.textContent = "Published on: " + article.source.name; // Källa
    sourceElement.classList.add("newsSource");
    sourceContainer.appendChild(sourceElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = "Written by: " + article.author; // Källa
    authorElement.classList.add("newsAuthor");
    sourceContainer.appendChild(authorElement);

    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Mark as favorite "; // Kort beskrivning
    favoriteButton.classList.add("favoriteButton");

    // Lägg till hjärtat som en ikon
    const heartIcon = document.createElement("img");
    heartIcon.src = "images/heart.svg"; // Sökväg till hjärtikonen
    heartIcon.alt = "Favorite";
    heartIcon.style.width = "20px"; // Justera storlek
    heartIcon.style.height = "20px"; // Justera storlek
    favoriteButton.appendChild(heartIcon); // Lägg till ikonen i knappen

    newsArticle.appendChild(favoriteButton);

    newsFeed.appendChild(newsArticle); // Lägger till artikeln i newsFeed

    favoriteButton.addEventListener("click", () => {
      handleFavorite(article);
    });
  });
}

// Funktion för att hämta sources från API och rendera de i dropdown menyn
function populateSourceFilter() {
  const sourceFilter = document.getElementById("sourceFilter");
  const sources = [];
  news.articles.forEach((article) => {
    if (!sources.includes(article.source.name)) {
      sources.push(article.source.name);
    }
  });

  // Renderar source till text i menyn
  sourceFilter.innerHTML = '<option value="">All Sources</option>';
  sources.forEach((source) => {
    const option = document.createElement("option");
    option.value = source;
    option.textContent = source;
    sourceFilter.appendChild(option);
  });

  sourceFilter.addEventListener("change", filterBySource);
}

// Filtrerar artiklar baserat på källa
function filterBySource() {
  const selectedSource = document.getElementById("sourceFilter").value;
  const filteredNews = selectedSource
    ? news.articles.filter((article) => article.source.name === selectedSource)
    : news.articles;

  displayNews({ articles: filteredNews });
}

// Byter ut URL mot kategorin som användaren klickar på
function categoryNews(category) {
  const currentPage = 1;
  fetchNews(currentPage, category);
}
document.querySelectorAll(".categoryButton").forEach((button) => {
  button.addEventListener("click", (event) => {
    const category = event.target.dataset.category;
    categoryNews(category);
  });
});

function handleFavorite(article) {
  console.log(article);
  const favoriteButton = document.querySelector(`button.favoriteButton:has(img[alt="Favorite"])`); // Hämta knappen
  if (favoriteNews.includes(article)) {
    favoriteNews = favoriteNews.filter((a) => a !== article);
    favoriteButton.classList.remove("active"); // Ta bort aktiv klass om den redan är favorit
  } else {
    favoriteNews.push(article);
    favoriteButton.classList.add("active"); // Lägg till aktiv klass
  }
  updateFavoritesFeed();
}

// Ny funktion för att uppdatera favoritesFeed
function updateFavoritesFeed() {
  const favoritesFeed = document.getElementById('favoritesFeed');
  favoritesFeed.innerHTML = ''; // Rensa tidigare innehåll
  favoriteNews.forEach((article) => {
    const articleElement = document.createElement('div');
    articleElement.textContent = article; // Anta att article är en sträng
    favoritesFeed.appendChild(articleElement);
  });
}

// search news by title
function searchNews() {
  // retrieves user input
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  // selects the newsFeed container where the articles are displayed
  const container = document.getElementById("newsFeed");

  // Clear the container
  container.innerHTML = "";

  // Checks if the news object or its articles array is undefined or empty
  // displays a loading message if data isn't available
  if (!news || !news.articles) {
    const container = document.getElementById('newsFeed');
    container.innerHTML = `
      <div class="message-container">
        <h3 class="status-message">Please wait for news to load...</h3>
      </div>
    `;
    return;
}

  // If search is empty, show all news
  if (!searchInput) {
    displayNews(news);
    return;
  }


  // Filter articles based on title
  const filteredArticles = news.articles.filter((article) =>
    article.title.toLowerCase().includes(searchInput)
  );

  // Display message if no results found
  if (filteredArticles.length === 0) {
      console.log('No articles found matching that title...');
      container.innerHTML = `
      <div class="message-container">
        <h3 class="status-message">No articles found matching that title...</h3>
      </div>
    `;
      return;
  }
  
   // Display filtered articles using the existing displayNews function
   displayNews({ articles: filteredArticles });
  }

// Add event listener to search input
document.getElementById("search-input").addEventListener("input", searchNews);

function pagination() {}
