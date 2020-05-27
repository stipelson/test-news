import React from 'react';
import PropTypes from 'prop-types';
/* import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col'; */

const ArticleItem = ({ title, body, image, url }) => {
  return (
    <section>
      <a
        className="list-item"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={image}
          alt={title || 'Article image'}
          className="list-item-image"
        />
        <h3>{title}</h3>
        <p>{body}</p>
      </a>
    </section>
  );
};

ArticleItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default ArticleItem;
