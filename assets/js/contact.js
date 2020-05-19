function initializeForm() {
  var form = document.getElementById("form-contact");
  var inputs = form.elements; 

  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
  
    input.addEventListener('input', function (event) {
      validateInput(input);
    });
  }
}

function validateInput(input){
  var valid = true;
  switch (input.type) {
    case 'email':
      valid = validateEmail(input)
      break;
    case 'phone':
    case 'tel':
      valid = validatePhone(input)
      break;
    case 'submit':
    case 'checkbox':
      break;
    default:
      valid = validateRequired(input);
      break;
  }
  return valid;
}

function submitContact(form) {
  try {
    var valid = validateForm(form);
    if (valid) showModal(form);
  } catch (error) {
    alert(error);
  }
  
  return false;
}

function validateForm(form) {
  var errors = 0;
  var inputs = form.elements; 

  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    if (!validateInput(input)) errors++;
  }

  return errors > 0 ? false : true;
}

function validateRequired(input) {
  if (input.id) {
    if (input.value.length >= 0 && input.value) {
      showValid(input);
      return true;
    } 
    showError(input, 'This input is required.');
  }
  return false;
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
  var phoneRegExp = /^[2-9]\d{2}\d{3}\d{4}$/;

  if (input.id) {
    var test = phoneRegExp.test(input.value);

    if (test) {
      showValid(input);
      return true;
    } else {
      showError(input, 'The phone must have 10 numbers, ex: 8005555555.');
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

function showModal(form) {
  var modal = document.getElementById('submit-modal');
  var modalContent = document.getElementById('modal-content');
  var formString = toJSONString(form);

  modalContent.innerHTML = syntaxHighlight(formString);
  modal.style.display = "block";
}

// === Get obj from form inputs ===
function toJSONString( form ) {
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

  return JSON.stringify( obj, undefined, 4 );
}

// === Created by http://jsfiddle.net/KJQ9K/554/ ===
// Add style to data
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}