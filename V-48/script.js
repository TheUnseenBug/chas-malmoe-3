const searchInput = document.getElementById("search-input");
const container = document.getElementById("newsFeed");

searchInput.addEventListener("input", searchNews);
let favoriteNews = [];
let news = [];
let currentPage = 1;
const articlesPerPage = 10;

async function fetchNews(page, category) {
  try {
    const apiKey = "e1e4efc08e2f4a1dbcd2f0e42102139c"; //db6c1d2353eb42528700f136fd8899fb
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
    // console.log(response);
    displayNews(response);
    pagination();
    populateSourceFilter();
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = `
      <div class="message-container">
        <h3 class="status-message">No news found, try again later!</h3>
      </div>
    `;
  }
}

fetchNews();

function displayNews(response) {
  // Hämtar newsFeed-elementet där artiklarna ska visas
  const newsFeed = document.getElementById("newsFeed");
  // Tömmer containern innan några artiklar läggs till
  newsFeed.innerHTML = "";

  // Beräknar start- och slutindex för att hämta rätt artiklar baserat på aktuell sida
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  // Hämtar de aktuella artiklarna från svaret baserat på beräknade index
  const responseCurrentArticles = response.articles.slice(startIndex, endIndex);

  // Loopar igenom varje artikel i den aktuella artikellistan
  responseCurrentArticles.forEach((article) => {
    // Skapar ett nytt artikel-element
    const newsArticle = document.createElement("article");
    // Lägger till klassen "newsArticle" för styling
    newsArticle.classList.add("newsArticle");

    // Skapar och lägger till publiceringsdatum och tid
    const dateElement = document.createElement("p");
    // Skapar ett Date-objekt från publiceringsdatumet
    const publishedDate = new Date(article.publishedAt);
    // Definierar formatinställningar för datum och tid
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Stockholm",
    };
    // Formaterar datum och tid på engelska och sätter textinnehållet
    dateElement.textContent = publishedDate.toLocaleString("en-US", options);
    // Lägger till klassen "newsDate" för styling
    dateElement.classList.add("newsDate");
    // Lägger till datum-elementet i artikel-elementet
    newsArticle.appendChild(dateElement);

    // Skapar och lägger till titeln för artikeln
    const titleElement = document.createElement("h3");
    titleElement.textContent = article.title; // Sätter titeln
    titleElement.classList.add("newsTitle"); // Lägger till klassen "newsTitle"
    // Lägger till titeln i artikel-elementet
    newsArticle.appendChild(titleElement);

    // Skapar och lägger till en bild för artikeln
    const imgElement = document.createElement("img");
    imgElement.src = article.urlToImage; // Sätter bildens källa
    imgElement.classList.add("newsImg"); // Lägger till klassen "newsImg"
    imgElement.style.width = "100%"; // Sätter bredden till 100%
    imgElement.style.height = "auto"; // Sätter höjden till automatisk
    // Lägger till bilden i artikel-elementet
    newsArticle.appendChild(imgElement);

    // Gör bilden klickbar och leder till den fullständiga artikeln
    imgElement.addEventListener("click", (event) => {
      window.open(article.url, "_blank"); // Öppnar artikeln i en ny flik
    });

    // Skapar och lägger till en kort beskrivning av artikeln
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description; // Sätter beskrivningen
    descriptionElement.classList.add("newsDescription"); // Lägger till klassen "newsDescription"
    // Lägger till beskrivningen i artikel-elementet
    newsArticle.appendChild(descriptionElement);

    // Skapar en container för källinformation
    const sourceContainer = document.createElement("section");
    sourceContainer.className = "source-container"; // Lägger till klassen "source-container"
    // Lägger till källcontainern i artikel-elementet
    newsArticle.appendChild(sourceContainer);

    // Skapar och lägger till författarens namn
    const sourceElement = document.createElement("p");
    sourceElement.textContent = "Published on: " + article.source.name; // Sätter källan
    sourceElement.classList.add("newsSource"); // Lägger till klassen "newsSource"
    // Lägger till källan i källcontainern
    sourceContainer.appendChild(sourceElement);

    // Skapar och lägger till författarens namn
    const authorElement = document.createElement("p");
    authorElement.textContent = "Written by: " + article.author; // Sätter författarens namn
    authorElement.classList.add("newsAuthor"); // Lägger till klassen "newsAuthor"
    // Lägger till författarens namn i källcontainern
    sourceContainer.appendChild(authorElement);

    // Skapar en knapp för att markera artikeln som favorit
    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Favorite ❤️"; // Sätter texten på knappen
    favoriteButton.classList.add("favoriteButton"); // Lägger till klassen "favoriteButton"

    // Lägger till favoritknappen i artikel-elementet
    newsArticle.appendChild(favoriteButton);

    // Lägger till hela artikel-elementet i newsFeed
    newsFeed.appendChild(newsArticle);

    // Lägger till en eventlyssnare för att hantera favoritmarkering
    favoriteButton.addEventListener("click", () => {
      handleFavorite(article, favoriteButton); // Anropar handleFavorite-funktionen
    });
  });
}

// Abbas -  Skapar en rad sidknappar baserat på antalet artiklar. Varje knapp uppdaterar aktuella sidan och hämtar artiklar för just den sidan. Aktuella sidans knapp inaktiveras för ge visuell feedback.
function pagination() {
  const paginationContainer = document.querySelector(".pagination");
  if (!paginationContainer) {
    const footer = document.querySelector("footer");
    const newPaginationContainer = document.createElement("div");
    newPaginationContainer.classList.add("pagination");
    footer.appendChild(newPaginationContainer);
  }
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(news.articles.length / articlesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("paginationButton");
    if (i === currentPage) {
      button.disabled = true;
    }
    button.addEventListener("click", () => {
      currentPage = i;
      // displayNews();
      fetchNews(currentPage);
      document.documentElement.scrollTop = 0;
    });
    pagination.appendChild(button);
  }
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

  sourceFilter.addEventListener("change", (event) => {
    searchInput.value = "";
    filterBySource(event);
  });
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

    searchInput.value = "";
  });
});

function handleFavorite(article, favoriteButton) {
  console.log(article); // Loggar den aktuella artikeln till konsolen för felsökning

  // Kontrollerar om artikeln redan finns i listan över favoriter
  if (favoriteNews.includes(article)) {
    // Om artikeln är en favorit, ta bort den från listan
    favoriteNews = favoriteNews.filter((a) => a !== article); // Filtrerar bort artikeln från favoriteNews
    favoriteButton.classList.remove("active"); // Tar bort den aktiva klassen från knappen
    favoriteButton.textContent = "Favorite ❤️"; // Återställer texten på knappen
  } else {
    // Om artikeln inte är en favorit, lägg till den i listan
    favoriteNews.push(article); // Lägger till artikeln i favoriteNews
    favoriteButton.classList.add("active"); // Lägger till den aktiva klassen på knappen
    favoriteButton.textContent = "Remove from favorites ❌"; // Ändrar texten på knappen
  }
  updateFavoritesFeed(); // Anropar funktionen för att uppdatera visningen av favoriter
}

// Ny funktion för att uppdatera favoritesFeed
function updateFavoritesFeed() {
  const favoritesFeed = document.getElementById("favoritesFeed"); // Hämtar elementet där favoriter ska visas
  favoritesFeed.innerHTML = ""; // Rensar tidigare innehåll i favoritesFeed
  // Loopar igenom varje artikel i favoriteNews
  favoriteNews.forEach((article) => {
    const articleElement = document.createElement("div"); // Skapar ett nytt div-element för artikeln
    articleElement.textContent = article; // Sätter textinnehållet till artikelns namn eller identifierare
    favoritesFeed.appendChild(articleElement); // Lägger till artikel-elementet i favoritesFeed
  });
}

// search news by title
function searchNews() {
  // retrieves user input
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  // selects the newsFeed container where the articles are displayed
  const container = document.getElementById("newsFeed");

  // Clear the container
  container.innerHTML = "";

  // Checks if the news object or its articles array is undefined or empty
  // displays a loading message if data isn't available
  if (!news || !news.articles) {
    const container = document.getElementById("newsFeed");
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
    console.log("No articles found matching that title...");
    container.innerHTML = `
      <div class="message-container">
        <h3 class="status-message">No articles found matching that title...</h3>
      </div>
    `;
    return;
  }

  // Display filtered articles using the existing displayNews function
  // object literal, the object has one property which is: articles
  // articles is also the key and filteredArticles is its value
  displayNews({ articles: filteredArticles });
}

// Add event listener to search input, when a user writes in the input
// field that triggers the searchNews function
document.getElementById("search-input").addEventListener("input", searchNews);
