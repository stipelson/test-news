import React from 'react';
import PropTypes from 'prop-types';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import Button from 'emerald-ui/lib/Button';
import TextField from 'emerald-ui/lib/TextField';
import Checkbox from 'emerald-ui/lib/Checkbox';
import TextArea from './TextArea';

import Panel from 'emerald-ui/lib/Panel';

import useForm from '../lib/useForm';

const ContactForm = ({ title, onValidForm }) => {
  const stateSchema = {
    first_name: { value: '', error: '' },
    last_name: { value: '', error: '' },
    email: { value: '', error: '' },
    phone: { value: '', error: '' },
    message: { value: '', error: '' },
    email_subscription: { value: false, error: '' },
  };

  const validationStateSchema = {
    first_name: {
      required: true,
    },
    last_name: {
      required: true,
    },
    email: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        error: 'Please enter a valid email address.',
      },
    },
    phone: {
      required: true,
      validator: {
        regEx: /^[0-9]\d{2}\d{3}\d{4}$/,
        error: 'The phone must have 10 numbers, ex: 8005555555.',
      },
    },
    message: {
      required: true,
    },
    email_subscription: {
      required: false,
    },
  };

  const onSubmitForm = (state) => {
    const values = {
      first_name: state.first_name.value,
      last_name: state.last_name.value,
      email: state.email.value,
      phone: state.phone.value,
      message: state.message.value,
      email_subscription: state.email_subscription.value,
    };
    onValidForm(JSON.stringify(values, null, 2));

    return true;
  };

  const { state, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return (
    <section id="contact">
      <div className="container">
        <h2 className="mt-0 text-center">{title}</h2>
        <Panel className="card-container">
          <Panel.Body>
            <form data-testid="contact-form" onSubmit={handleOnSubmit}>
              <Row className="extra-p-md-6">
                <Col xs={6} className="mb-46">
                  <TextField
                    label="First Name"
                    name="first_name"
                    onChange={handleOnChange}
                    value={state.first_name.value}
                    errorMessage={state.first_name.error}
                    data-testid="first-name"
                  />
                </Col>
                <Col xs={6} className="mb-46">
                  <TextField
                    label="Last Name"
                    name="last_name"
                    onChange={handleOnChange}
                    value={state.last_name.value}
                    errorMessage={state.last_name.error}
                    data-testid="last-name"
                  />
                </Col>
              </Row>
              <Row className="extra-p-md-6">
                <Col xs={6} className="mb-46">
                  <TextField
                    label="Email"
                    name="email"
                    onChange={handleOnChange}
                    value={state.email.value}
                    errorMessage={state.email.error}
                    data-testid="email-input"
                  />
                </Col>
                <Col xs={6} className="mb-46">
                  <TextField
                    label="Phone Number"
                    name="phone"
                    onChange={handleOnChange}
                    value={state.phone.value}
                    errorMessage={state.phone.error}
                    data-testid="phone-input"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} role="textbox" className="mb-46">
                  <TextArea
                    label="Message"
                    rows="4"
                    name="message"
                    onChange={handleOnChange}
                    value={state.message.value}
                    errorMessage={state.message.error}
                    data-testid="message-input"
                  />
                </Col>
              </Row>
              <Checkbox
                label="Send me emails about breaking news and promotions."
                className="mt-0 mb-46"
                name="email_subscription"
                checked={state.email_subscription.value}
                onChange={handleOnChange}
              />
              <div className="text-center submit-button">
                <Button
                  type="submit"
                  color="primary"
                  className="eui-btn-inverted btn-padding-lg"
                  size="sm"
                  ariaLabel="Subscribe to newsletter"
                >
                  <span>Submit form</span>
                </Button>
              </div>
            </form>
          </Panel.Body>
        </Panel>
      </div>
    </section>
  );
};

ContactForm.propTypes = {
  title: PropTypes.string,
  onValidForm: PropTypes.func,
};

ContactForm.defaultProps = {
  title: '',
};

export default ContactForm;
