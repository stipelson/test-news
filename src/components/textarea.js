import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ id, label, className, errorMessage, role, ...rest }) => {
  const inputElementProps = {
    ...rest,
    'aria-invalid': !!errorMessage,
    'aria-errormessage': `${id}ErrorMessage`,
    role,
  };

  return (
    <div className={['eui-text-field', className].join(' ')}>
      <div className="eui-text-field-wrapper">
        <textarea {...inputElementProps} aria-label={label}></textarea>
        <div className="eui-text-field-footer">
          <span
            id={`${id}ErrorMessage`}
            className="eui-text-field-message eui-text-field-error-message"
            role="alert"
          ></span>
          <span className="eui-text-field-message eui-text-field-help-text"></span>
        </div>
      </div>
      <label>{label}</label>
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.any,
  role: PropTypes.string,
};

TextArea.defaultProps = {
  role: 'textbox',
};

export default TextArea;
