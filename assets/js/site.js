const modal = document.getElementById('submit-modal');
const closeModal = document.getElementsByClassName('modal-close')[0];
var closeAlertButton = document.getElementById('close-alert');

// Functions

var toggleDropdown = function (event) {
  if (event) event.preventDefault();
  var attribute = this.getAttribute('data-target');
  document.getElementById(attribute).classList.toggle('show');
};

function initializeDropdowns() {
  var dropdowns = document.getElementsByClassName('dropdown-trigger');
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', toggleDropdown, false);
  }
}

function closeAlert() {
  var target = this.getAttribute('data-target');
  var nodeTarget = document.getElementById(target);
  if (nodeTarget) nodeTarget.style.display = 'none';
}

// Events
closeModal.onclick = function () {
  modal.style.display = 'none';
};

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
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

  // Close the modal
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

initializeDropdowns();
closeAlertButton.onclick = closeAlert;
