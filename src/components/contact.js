import React from 'react';
import PropTypes from 'prop-types';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import Button from 'emerald-ui/lib/Button';
import TextField from 'emerald-ui/lib/TextField';
import Checkbox from 'emerald-ui/lib/Checkbox';
import TextArea from '../components/textarea';

import Card from 'emerald-ui/lib/Card';

const Contact = ({ title }) => {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="mt-0 text-center">{title}</h2>
        <Card className="card-container">
          <form>
            <Row>
              <Col xs={6} className="mb-46">
                <TextField label="First Name" />
              </Col>
              <Col xs={6} className="mb-46">
                <TextField label="Last Name" />
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="mb-46">
                <TextField label="Email" />
              </Col>
              <Col xs={6} className="mb-46">
                <TextField label="Phone Number" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} role="textbox" className="mb-46">
                <TextArea label="Message" rows="4" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} role="textbox">
                <Checkbox
                  defaultChecked
                  label="Send me emails about breaking news and promotions."
                  className="mt-0 mb-46"
                />
              </Col>
            </Row>
            <div className="text-center submit-button">
              <Button
                color="primary"
                className="eui-btn-inverted btn-padding-lg"
                size="sm"
                ariaLabel="Subscribe to newsletter"
                onClick={() => {}}
              >
                <span>Submit form</span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

Contact.propTypes = {
  title: PropTypes.string,
};

Contact.defaultProps = {
  title: '',
};

export default Contact;
