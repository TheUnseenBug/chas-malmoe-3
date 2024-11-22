//   "https://newsapi.org/v2/top-headlines?country=us&apiKey=db6c1d2353eb42528700f136fd8899fb"

let news = [];

async function fetchNews() {
  try {
    const response = await fetch("test.json");
    const data = await response.json();
    console.log(data);
    news = data;
    displayNews(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchNews();

function displayNews(news) {
    const newsFeed = document.getElementById("newsFeed"); // Hämtar newsFeed-elementet

    news.articles.forEach(article => {
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
    });
}

function filterNews() {
  //???????
}

function categoryNews() {}

function favoriteNews() {}

function searchNews() {}

function pagination() {}
