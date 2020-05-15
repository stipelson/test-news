// Functions

var toggleDropdown = function() {
  var attribute = this.getAttribute('data-target');
  document.getElementById(attribute).classList.toggle('show');
};

function initializeDropdowns() {
  var dropdowns = document.getElementsByClassName('dropdown-trigger');
  for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener('click', toggleDropdown, false);
  }
}

function closeModal(node) {
  var target = node.getAttribute('data-target');
  var nodeTarget = document.getElementById(target);
  if (nodeTarget) nodeTarget.style.display = 'none';
}

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
};

// Events

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-trigger')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}