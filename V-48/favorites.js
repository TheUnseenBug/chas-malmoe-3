let favoriteNews = [];
function getAllFromLocalStorage() {
  try {
    const allItems = {};
    // Iterate over all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i); // Get the key at index i

      // Skip the "debug" key
      if (key === "debug") continue;

      const value = localStorage.getItem(key); // Get the value for the key
      try {
        allItems[key] = JSON.parse(value); // Try to parse the JSON value
      } catch (parseError) {
        console.warn(
          `Failed to parse JSON for key "${key}". Storing raw value.`,
          parseError
        );
        allItems[key] = value; // Fallback to storing the raw value
      }
    }
    return allItems;
  } catch (error) {
    console.error("Failed to retrieve data from localStorage", error);
    return null;
  }
}

// Usage
result = getAllFromLocalStorage();
favoriteNews = responseCurrentArticles = Object.values(result);

function displayNews(response, feed) {
  const newsFeed = document.getElementById(feed); // Hämtar elementet där nyheterna ska visas
  newsFeed.innerHTML = ""; // Rensar tidigare innehåll i nyhetsflödet

  response.forEach((article) => {
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
        <button class="favoriteButton">Remove from favorites ❌</button>
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
displayNews(favoriteNews, "favoritesFeed");

function updateFavoritesFeed() {
  const items = getAllFromLocalStorage();
  displayNews(favoriteNews, "favoritesFeed");
}

function handleFavorite(article, favoriteButton) {
  console.log(article); // Loggar den aktuella artikeln till konsolen för felsökning
  console.log(favoriteNews);
  // Kontrollerar om artikeln redan finns i listan över favoriter
  if (favoriteNews.includes(article)) {
    // Om artikeln är en favorit, ta bort den från listan
    favoriteNews = favoriteNews.filter((a) => a !== article); // Filtrerar bort artikeln från favoriteNews
    favoriteButton.classList.remove("active"); // Tar bort den aktiva klassen från knappen
    favoriteButton.textContent = "Favorite ❤️"; // Återställer texten på knappen
    removeFromLocalStorage(article.url);
  } else {
    // Om artikeln inte är en favorit, lägg till den i listan
    favoriteNews.push(article); // Lägger till artikeln i favoriteNews
    favoriteButton.classList.add("active"); // Lägger till den aktiva klassen på knappen
    favoriteButton.textContent = "Remove from favorites ❌"; // Ändrar texten på knappen
    addToLocalStorage(article.url, article);
  }
  updateFavoritesFeed(); // Anropar funktionen för att uppdatera visningen av favoriter
}

function addToLocalStorage(key, value) {
  try {
    // Convert value to JSON string (in case it's an object or array)
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    console.log(`Data added to localStorage: ${key} =`, value);
  } catch (error) {
    console.error("Failed to add to localStorage", error);
  }
}

function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    console.log(`Key "${key}" removed from localStorage.`);
  } catch (error) {
    console.error(`Failed to remove key "${key}" from localStorage`, error);
  }
}

// function clearLocalStorage() {
//   try {
//     localStorage.clear();
//     console.log("localStorage has been cleared successfully.");
//   } catch (error) {
//     console.error("Failed to clear localStorage", error);
//   }
// }

// // Usage
// clearLocalStorage();
