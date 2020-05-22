export function getParams(url) {
  var params = {};
  var query = url.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  console.log(params);
  return params;
}
