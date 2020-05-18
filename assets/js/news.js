// Get params from url
const params = getParams(window.location.href);
var currentPage = 1;

function getNews() {
  var category = params.category || 'general';
  requestNews(category, currentPage, callbackNews);
}

var callbackNews = function(response) {
  if (response && response.data && response.data.articles) {
    drawNews(response.data.articles);
  }
  currentPage++;
  return;
}

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

      colElement.className = 'col-half';
      
      linkElement.className = 'list-item';
      linkElement.href = article.url;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';

      imgElement.className = 'list-item-image';
      imgElement.src = article.urlToImage;
      imgElement.tag = article.title;

      titleElement.className = 'list-item-title';
      descriptionElement.className = 'list-item-description';

      linkElement.appendChild(imgElement);
      linkElement.appendChild(titleElement);
      linkElement.appendChild(descriptionElement);
      colElement.appendChild(linkElement);
      rowNode.appendChild(colElement);
    }
  }
}

