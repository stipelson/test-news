import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

import Panel from 'emerald-ui/lib/Panel';
import Button from 'emerald-ui/lib/Button';

import Banner from '../components/Banner';
import ContactForm from '../components/ContactForm';
import ArticlesList from '../components/ArticlesList';
import Modal from 'emerald-ui/lib/Modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsActions from '../state/actions';
import { getParams } from '../lib/utils';
import { navigate } from '@reach/router';

export const IndexPage = ({
  loadNews,
  loading,
  articles,
  location,
  menuNav,
  userNav,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [query, setQuery] = useState({
    page: 1,
    topicId: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
  });
  const params = getParams(location.search);

  const bannerContent =
    'Subscribe to our newsletter to receive weekly digests of the ' +
    'best and most ground-breaking news. Also receive a discount on ' +
    'your monthly subscription.';

  const handleValidForm = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLoadNews = (reload) => {
    loadNews({ options: { articlesPage: query.page }, reload });
    const prevQuery = query;
    setQuery({ ...prevQuery, page: prevQuery.page + 1 });
  };

  const handleNavigate = (navTopicId) => {
    const prevQuery = query;
    if (!loading) {
      navigate(`?category=${navTopicId}`);
      loadNews({ options: { articlesPage: 1, uri: navTopicId }, reload: true });
      setQuery({ ...prevQuery, page: 2, topicId: navTopicId });
    }
  };

  if (query.page === 1) {
    handleLoadNews(true);
  }

  return (
    <Layout
      hiddenTitle
      params={params}
      onNavigate={handleNavigate}
      menuNav={menuNav}
      userNav={userNav}
    >
      <SEO title="Home" />

      <div className="container main-container">
        <h2 className="mt-0">Top news</h2>

        <Panel className="card-container">
          <Panel.Body>
            <ArticlesList articles={articles} loading={loading} />
          </Panel.Body>
        </Panel>

        <div className="text-center">
          <Button
            color="primary"
            size="sm"
            loading={loading}
            disabled={loading}
            onClick={() => handleLoadNews(false)}
          >
            View more stories
          </Button>
        </div>
      </div>

      <Banner
        title="Subscribe to our newsletter."
        content={bannerContent}
        buttonLabel="Subscribe"
        buttonAriaLabel="Button for subscribe"
        data-test-id="view-more-button"
      />

      <ContactForm title="Contact Us" onValidForm={handleValidForm} />

      <Modal onHide={closeModal} show={showModal} data-testid="modal-element">
        <Modal.Header closeButton={true}>
          <Modal.Title>Form content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{modalContent}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={closeModal}
            shape="flat"
            color="primary"
            data-testid="modal-close-button"
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.any,
  /* Actions */
  dispatch: PropTypes.func,
  loadNews: PropTypes.any,
  /* Reducers */
  articles: PropTypes.array,
  loading: PropTypes.bool,
  menuNav: PropTypes.bool,
  userNav: PropTypes.bool,
};

IndexPage.defaultProps = {
  menuNav: true,
  userNav: true,
};

export const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(newsActions, dispatch);
  return {
    dispatch,
    ...actions,
  };
};

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
