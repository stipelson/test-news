function requestNews(category, page, callback) {
  var newsApiKey = '7f8097e33ad945a9878f479dc1fff0bf';
  var url = 'https://newsapi.org/v2/top-headlines?country=us&category='+category+'&pageSize=4&page='+page+'&apiKey='+newsApiKey;
  axios.get(url)
    .then((response) => {
      // handle success
      callback(response);
    })
    .catch((error) => {
      // handle error
      alert(error);
    })
}