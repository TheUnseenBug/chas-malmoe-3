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

function searchNews() {}

function pagination() {}
