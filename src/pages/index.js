import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Card from 'emerald-ui/lib/Card';
import Button from 'emerald-ui/lib/Button';

import Banner from '../components/banner';
import ContactForm from '../components/contactForm';
import Modal from 'emerald-ui/lib/Modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActions from '../state/actions';

const IndexPage = ({ loadNews }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const bannerContent =
    'Subscribe to our newsletter to receive weekly digests of the ' +
    'best and most ground-breaking news. Also receive a discount on ' +
    'your monthly subscription.';

  const handleValidForm = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <Layout hiddenTitle>
      <SEO title="Home" />

      <div className="container main-container">
        <h2 className="mt-0">Top news</h2>

        <Card className="card-container"></Card>

        <div className="text-center">
          <Button color="primary" size="sm" onClick={() => loadNews({})}>
            View more stories
          </Button>
        </div>
      </div>

      <Banner
        title="Subscribe to our newsletter."
        content={bannerContent}
        buttonLabel="Subscribe"
        buttonAriaLabel="Button for subscribe"
        buttonAction={() => {
          return false;
        }}
      />

      <ContactForm title="Contact Us" onValidForm={handleValidForm} />

      <Modal
        onHide={() => {
          setShowModal(false);
        }}
        show={showModal}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Form content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{modalContent}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            shape="flat"
            color="primary"
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

IndexPage.propTypes = {
  isDarkMode: PropTypes.any,
  dispatch: PropTypes.func,
  loadNews: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(searchActions, dispatch);
  return {
    dispatch,
    ...actions,
  };
}

// export default IndexPage;
export default connect(
  (state) => ({
    isDarkMode: state.app.isDarkMode,
  }),
  mapDispatchToProps
)(IndexPage);
