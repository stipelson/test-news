import React from 'react';
import PropTypes from 'prop-types';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import Button from 'emerald-ui/lib/Button';

import ParallaxImage from '../assets/images/parallax-2x.jpg';

const Banner = ({
  title,
  content,
  buttonLabel,
  buttonAriaLabel,
  buttonAction,
}) => {
  return (
    <section id="banner" className="banner">
      <img className="banner-background" src={ParallaxImage} />
      <div className="container banner-body">
        <Row>
          <Col xs={6} className="sample-col">
            <h2 className="text-white banner-title">{title}</h2>
            <p className="text-white">{content}</p>
            <Button
              className="eui-btn-inverted btn-padding-lg"
              shape="outline"
              size="sm"
              ariaLabel={buttonAriaLabel}
              onClick={buttonAction}
            >
              <span>{buttonLabel}</span>
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
};

Banner.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonAriaLabel: PropTypes.string,
  buttonAction: PropTypes.func,
};

Banner.defaultProps = {
  title: '',
  content: '',
  buttonLabel: '',
  buttonAriaLabel: '',
  buttonAction: () => {
    return false;
  },
};

export default Banner;
