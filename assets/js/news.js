// Get params from url
const params = getParams(window.location.href);
var currentPage = 1;

function getParams(url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

function requestNews(category, page, callback) {
  var newsApiKey = '7f8097e33ad945a9878f479dc1fff0bf';
  var url =
    'https://newsapi.org/v2/top-headlines?country=us&category=' +
    category +
    '&pageSize=4&page=' +
    page +
    '&apiKey=' +
    newsApiKey;
  // eslint-disable-next-line no-undef
  axios
    .get(url)
    .then((response) => {
      // handle success
      callback(response);
    })
    .catch((error) => {
      // handle error
      alert(error);
    });
}

function getNews() {
  var category = params.category || 'general';
  requestNews(category, currentPage, callbackNews);
}

var callbackNews = function (response) {
  if (response && response.data && response.data.articles) {
    drawNews(response.data.articles);
  }
  currentPage++;
  return;
};

function drawNews(articles) {
  if (Array.isArray(articles)) {
    for (let index = 0; index < articles.length; index++) {
      var article = articles[index];

      var rowNode = document.getElementById('list-news');
      var colElement = document.createElement('section');
      var linkElement = document.createElement('a');
      var imgElement = document.createElement('img');
      var titleElement = document.createElement('h3');
      var descriptionElement = document.createElement('p');

      titleElement.innerText = article.title;
      descriptionElement.innerText = article.description;

      colElement.className = 'col-half-sm';

      linkElement.className = 'list-item';
      linkElement.href = article.url;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';

      imgElement.className = 'list-item-image';
      imgElement.src = article.urlToImage;
      imgElement.tag = article.title;

      linkElement.appendChild(imgElement);
      linkElement.appendChild(titleElement);
      linkElement.appendChild(descriptionElement);
      colElement.appendChild(linkElement);
      rowNode.appendChild(colElement);
    }
  }
}

getNews();