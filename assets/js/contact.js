function submitContact(form) {

  var valid = validateForm(form);

  if (valid) showModal();
  
  return false;
}

function validateForm(form) {
  var firstName = form["first_name"];
  var lastName = form["last_name"];
  var email = form["email"];
  var phoneNumber = form["phone_number"];
  var message = form["message"];

  // No submit the form, show modal.
  var valid = true;

  if (!vaidateRequired([firstName, lastName, email, phoneNumber, message])) {
    valid = false;
  }

  if (!validateEmail(email)) {
    valid = false;
  }

  if (!validatePhone(phoneNumber)) {
    valid = false;
  }

  return valid;
}

function showModal() {
  var form = document.getElementById("form-contact");
  var modal = document.getElementById('submit-modal');
  var modalContent = document.getElementById('modal-content');
  var formString = toJSONString(form);

  modalContent.innerHTML = formString;
  modal.style.display = "block";
}

function toJSONString( form ) {
  var form = document.getElementById("form-contact");
  var obj = {};
  var elements = form.querySelectorAll( "input, select, textarea" );
  for( var i = 0; i < elements.length; ++i ) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;

    if (element.type === 'checkbox') value = element.checked;

    if( name ) {
      obj[ name ] = value;
    }
  }

  return JSON.stringify( obj );
}

function vaidateRequired(inputs) {
  var errors = 0;
  for (let index = 0; index < inputs.length; index++) {
    var element = inputs[index];
    
    if (element.id) {
      var elementError = document.querySelector('#'+ element.id +' + span.error');
      

      if (element.value.length === 0 || !element.value) {
        element.className = 'form-input invalid';
        showError(elementError, 'This input is required.');
        errors++;
      } else {
        elementError.innerHTML = '';
        elementError.className = 'error';
        element.className = 'form-input valid';
      }
    } 
  }
  return errors >= 1 ? false : true;
}

function validateEmail(element) {
  var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (element.id) {
    var test = emailRegExp.test(element.value);
    var elementError = document.querySelector('#'+ element.id +' + span.error');

    if (test) {
      element.className = 'form-input valid';
      elementError.innerHTML = "";
      elementError.className = "error";
      return true;
    } else {
      element.className = 'form-input invalid';
      showError(elementError, 'You need to enter an e-mail address.');
      return false;
    }
  }
}

function validatePhone(element) {
  var phoneRegExp = /^[2-9]\d{2}-\d{3}-\d{4}$/;

  if (element.id) {
    var test = phoneRegExp.test(element.value);
    var elementError = document.querySelector('#'+ element.id +' + span.error');

    if (test) {
      element.className = 'form-input valid';
      elementError.innerHTML = "";
      elementError.className = 'error';
      return true;
    } else {
      element.className = 'form-input invalid';
      showError(elementError, 'You need to enter an valid phone, ex: 800-555-5555.');
      return false;
    }
  }
}

function showError(span, message) {
  span.className = 'error active';
  span.innerHTML = message;
}