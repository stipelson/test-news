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

  if (!vaidateRequired([firstName, lastName, email, phoneNumber, message]) || 
    !validateEmail(email) || 
    !validatePhone(phoneNumber)) {
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
    var input = inputs[index];
    
    if (input.id) {
      if (input.value.length === 0 || !input.value) {
        showError(input, 'This input is required.');
        errors++;
      } else {
        showValid(input);
      }
    } 
  }
  return errors >= 1 ? false : true;
}

function validateEmail(input) {
  var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.id) {
    var test = emailRegExp.test(input.value);

    if (test) {
      showValid(input);
      return true;
    } else {
      showError(input, 'You need to enter an e-mail address.');
      return false;
    }
  }
}

function validatePhone(input) {
  var phoneRegExp = /^[2-9]\d{2}-\d{3}-\d{4}$/;

  if (input.id) {
    var test = phoneRegExp.test(input.value);

    if (test) {
      showValid(input);
      return true;
    } else {
      showError(input, 'You need to enter an valid phone, ex: 800-555-5555.');
      return false;
    }
  }
}

function showValid(input) {
  var inputError = document.querySelector('#'+ input.id +' + span.error');
  input.className = 'form-input valid';
  inputError.innerHTML = "";
  inputError.className = 'error';
}

function showError(input, message) {
  var inputError = document.querySelector('#'+ input.id +' + span.error');

  input.className = 'form-input invalid';
  inputError.className = 'error active';
  inputError.innerHTML = message;
}