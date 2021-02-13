import { useState, useCallback } from 'react';

function useForm(stateSchema, validationSchema, callback) {
  const [state, setState] = useState(stateSchema);

  const validateRegex = (value, schema) => {
    if (schema.validator !== null && typeof schema.validator === 'object') {
      if (value && !schema.validator.regEx.test(value)) {
        return schema.validator.error;
      }
    }
    return false;
  };

  // validate on submit
  const validateStateOnSubmit = useCallback(() => {
    let errors = 0;
    let arraySchema = Object.keys(validationSchema);

    for (let index = 0; index < arraySchema.length; index++) {
      const key = arraySchema[index];
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value; // state value
      const stateError = state[key].error; // state error

      let msgError = '';

      if (validateRegex(stateValue, validationSchema[key])) {
        msgError = validationSchema[key].validator.error;
      } else if ((isInputFieldRequired && !stateValue) || stateError) {
        msgError = 'This is required field.';
      }

      if (msgError !== '') {
        errors++;
        setState((prevState) => ({
          ...prevState,
          [key]: { value: stateValue, error: msgError },
        }));
      }
    }

    return errors > 0;
  }, [state, validationSchema]);

  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    (event) => {
      // setIsDirty(true);

      const name = event.target.name;
      const type = event.target.type;
      const value =
        type === 'checkbox' ? event.target.checked : event.target.value;

      let error = '';
      if (validationSchema[name].required) {
        if (!value) {
          error = 'This is required field.';
        }
      }

      if (validateRegex(value, validationSchema[name])) {
        error = validationSchema[name].validator.error;
      }

      setState((prevState) => ({
        ...prevState,
        [name]: { value, error },
      }));
    },
    [validationSchema]
  );

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // Make sure that validateState returns undefined or false
      // Before calling the submit callback function
      if (!validateStateOnSubmit()) {
        callback(state);
      }
    },
    [state, callback, validateStateOnSubmit]
  );

  return { state, handleOnChange, handleOnSubmit };
}

export default useForm;
