//   "https://newsapi.org/v2/top-headlines?country=us&apiKey=db6c1d2353eb42528700f136fd8899fb"

async function fetchNews() {
  try {
    const response = await fetch("test.json");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchNews();

function displayNews() {
  //array.forEach()
}

function filterNews() {
  //???????
}

function categoryNews() {}

function favoriteNews() {}

async function searchNews() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const container = document.getElementById('newsFeed');

  try {
    const response = await fetch('text.json');
    const data = await response.json();
    const articles = data.articles;

    container.innerHTML = '';

    if (!searchTerm) {
      displayNews();
      return;
    }

    const searchedNews = articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm)
    );

    if (searchedNews.length === 0) {
      container.innerHTML = '<p>Nothing matched your search terms...</p>';
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
      console.log(searchTerm);
    });

  } catch (error) {
    console.error("Error searching news:", error);
    container.innerHTML = '<p>Error loading news articles</p>';
  }
}


function pagination() {}
