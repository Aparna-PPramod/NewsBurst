const API_KEY = "67a4e39992784d2f84e94fe419c4af00";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", function () {
  fetchnews("India");
});
async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  if (data["articles"].length == 0) {
    alert(
      "Your search did not match any documents.\n Make sure all the words are spelled correctly.\n Try different keywords."
    );
    return;
  }
  console.log(data);
  bindData(data["articles"]);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article["urlToImage"]) return;
    //deep cloning newsCardTemplate
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timezone: "Asia/Jakarta",
  });
  const clicked = cardClone.querySelector("#card");
  newsSource.innerHTML = `${article.source.name} : ${date}`;
  clicked.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchnews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchnews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
function reload() {
  window.location.reload();
}
