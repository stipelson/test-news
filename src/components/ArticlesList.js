import React from 'react';
import PropTypes from 'prop-types';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import ArticleItem from '../components/ArticleItem';

const ArticlesList = ({ articles }) => {
  let arrayArticles = Array.isArray(articles) ? articles : [];
  return (
    <Row className="extra-p-md-6">
      {arrayArticles.map((article, index) => (
        <Col key={`article-${index}`} xs={6} className="mb-46">
          <ArticleItem
            title={article.title}
            body={article.body}
            image={article.image}
            url={article.url}
          />
        </Col>
      ))}
    </Row>
  );
};

ArticlesList.propTypes = {
  articles: PropTypes.array,
  loading: PropTypes.bool,
};

ArticlesList.defaultProps = {
  articles: [],
  loading: false,
};

export default ArticlesList;
