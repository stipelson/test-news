import React from 'react';
import PropTypes from 'prop-types';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import Button from 'emerald-ui/lib/Button';
import TextField from 'emerald-ui/lib/TextField';

import Card from 'emerald-ui/lib/Card';

const Contact = ({ title }) => {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="mt-0 text-center">{title}</h2>
        <Card className="card-container">
          <form>
            <Row>
              <Col xs={6} className="sample-col">
                <TextField label="Label" />
              </Col>
              <Col xs={6} className="sample-col">
                <TextField label="Label" />
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="sample-col">
                <TextField label="Label" />
              </Col>
              <Col xs={6} className="sample-col">
                <TextField label="Label" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} role="textbox" className="sample-col">
                <TextField label="Label" />
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
