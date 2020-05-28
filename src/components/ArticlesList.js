import React from 'react';
import PropTypes from 'prop-types';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import ArticleItem from '../components/ArticleItem';

const ArticlesList = ({ articles }) => {
  let arrayArticles = Array.isArray(articles) ? articles : [];
  return (
    <Row className="extra-p-md-6" data-testid="article-list">
      {arrayArticles.map((article, index) => (
        <Col
          key={`article-${index}`}
          xs={6}
          className="mb-46"
          data-testid="article-item"
        >
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
};

ArticlesList.defaultProps = {
  articles: [],
};

export default ArticlesList;
