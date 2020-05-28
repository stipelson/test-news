/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export const PureSEO = ({ description, lang, meta, title, data }) => {
  const metaDescription =
    description || (data && data.site)
      ? data.site.siteMetadata.description
      : 'Site description';

  const dataTitle =
    data && data.site ? data.site.siteMetadata.title : 'Site title';

  const dataAuthor =
    data && data.site ? data.site.siteMetadata.author : 'Site title';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${dataTitle}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: dataAuthor,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

PureSEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
};

PureSEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export const SEO = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return <PureSEO {...props} data={data}></PureSEO>;
};

export default SEO;
