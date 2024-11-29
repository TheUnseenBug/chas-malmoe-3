const searchInput = document.getElementById("search-input");
const container = document.getElementById("newsFeed");

searchInput.addEventListener("input", searchNews);
let favoriteNews = [];
let news = [];
let currentPage = 1;
const articlesPerPage = 10;

async function fetchNews(page, category) {
  try {
    // const apiKey = "e1e4efc08e2f4a1dbcd2f0e42102139c"; // Key 1
    // const apiKey = "db6c1d2353eb42528700f136fd8899fb"; // Key 2
    // const url = `https://newsapi.org/v2/top-headlines?country=us${
    //   category ? `&category=${category}` : ""
    // }&page=${page}&apiKey=${apiKey}`;
    const url = "test.json";
    const data = await fetch(url);
    const response = await data.json();

    if (!data.ok) {
      throw new Error(`API Error: ${data.status} ${data.statusText}`);
    }

    if (!response.articles || response.articles.length === 0) {
      throw new Error("No articles found.");
    }

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
        <h3 class="status-message">Ops, something went wrong: ${error.message}</h3>
      </div>
    `;
  }
}

fetchNews();

const weatherAPIkey = "f5d21086c0e96fb934d7912aa22ea60e";
let weatherData = null;

async function fetchWeather() {
  try {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherAPIkey}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    weatherData = data;

    if (!response.ok) {
      throw new Error(`API Error: ${data.status} ${data.statusText}`);
    }
    console.log(weatherData);
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherDisplay.innerHTML = `
      <div class="message-container">
        <h3 class="status-message">Ops, something went wrong: ${error.message}</h3>
      </div>
    `;
  }
}

fetchWeather();

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function displayWeather(weatherData) {
  if (!weatherData) return;
  const weatherDisplay = document.getElementById("weatherDisplay");
  console.log(weatherData);
  weatherDisplay.innerHTML = `
    <h3>Current Weather</h3>
    <p>Temperature: ${Math.round(weatherData.main.temp)}°C</p>
    <p>Condition: ${weatherData.weather[0].main}</p>
    <p>Location: ${weatherData.name}</p>
   `;
}

displayWeather();

function displayNews(response) {
  const newsFeed = document.getElementById("newsFeed"); // Hämtar elementet där nyheterna ska visas
  newsFeed.innerHTML = ""; // Rensar tidigare innehåll i nyhetsflödet

  const startIndex = (currentPage - 1) * articlesPerPage; // Beräknar startindex för artiklar på aktuell sida
  const endIndex = startIndex + articlesPerPage; // Beräknar slutindex för artiklar på aktuell sida
  const responseCurrentArticles = response.articles.slice(startIndex, endIndex); // Skapar en lista med artiklar för aktuell sida

  responseCurrentArticles.forEach((article) => {
    // Itererar över varje artikel i den aktuella sidan
    const publishedDate = new Date(article.publishedAt).toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Stockholm",
      }
    ); // Formaterar publiceringsdatumet för artikeln

    const newsArticle = document.createElement("article"); // Skapar ett nytt artikel-element
    newsArticle.classList.add("newsArticle"); // Lägger till en CSS-klass för styling
    newsArticle.innerHTML = `
      <p class="newsDate">${publishedDate}</p>
      <h3 class="newsTitle">${article.title}</h3>
      <img src="${article.urlToImage}" class="newsImg" style="width: 100%; height: auto;" />
      <p class="newsDescription">${article.description}</p>
      <section class="source-container">
        <p class="newsSource">Published on: ${article.source.name}</p>
        <p class="newsAuthor">Written by: ${article.author}</p>
      </section>
      <button class="favoriteButton">Favorite ❤️</button>
    `;

    newsArticle
      .querySelector("img")
      .addEventListener("click", () => window.open(article.url, "_blank")); // Lägger till en händelse för att öppna artikeln i en ny flik när bilden klickas
    newsArticle
      .querySelector(".favoriteButton")
      .addEventListener("click", () =>
        handleFavorite(article, newsArticle.querySelector(".favoriteButton"))
      ); // Lägger till en händelse för att hantera favoritmarkering

    newsFeed.appendChild(newsArticle); // Lägger till artikel-elementet i nyhetsflödet
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
