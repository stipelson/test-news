import { useState, useEffect, useCallback } from 'react';

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Disable = false on initial render.
  useEffect(() => {
    setDisable(true);
  }, []);

  const validateRegex = (value, schema) => {
    if (schema.validator !== null && typeof schema.validator === 'object') {
      if (value && !schema.validator.regEx.test(value)) {
        return schema.validator.error;
      }
    }
    return false;
  };

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).find((key) => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value; // state value
      const stateError = state[key].error; // state error

      if ((isInputFieldRequired && !stateValue) || stateError) {
        return true;
      }

      if (
        validationSchema[key].validator !== null &&
        typeof validationSchema[key].validator === 'object'
      ) {
        if (
          stateValue &&
          !validationSchema[key].validator.regEx.test(stateValue)
        ) {
          return true;
        }
      }

      return false;
    });
    return hasErrorInState;
  }, [state, validationSchema]);

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

      if ((isInputFieldRequired && !stateValue) || stateError) {
        msgError = 'This is required field.';
      }

      if (validateRegex(stateValue, validationSchema[key])) {
        msgError = validationSchema[key].validator.error;
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

  // For every changed in our state this will be fired
  // To be able to disable
  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty, validateState]);

  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    (event) => {
      setIsDirty(true);

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

  return { state, disable, handleOnChange, handleOnSubmit };
}

export default useForm;
