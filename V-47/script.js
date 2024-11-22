async function fetchNews(page, category) {
  try {
    const apiKey = "db6c1d2353eb42528700f136fd8899fb";
    const url = `https://newsapi.org/v2/top-headlines?country=us${
      category ? `&category=${category}` : ""
    }&page=${page}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchNews(2);

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
