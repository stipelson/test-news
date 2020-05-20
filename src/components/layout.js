/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import BrandLogo from '../assets/images/logo.svg'
import Header from './header'
import Alert from 'emerald-ui/lib/Alert'

const Layout = ({ children, hiddenTitle }) => {
  const [showAlert, setShowAlert] = useState(true);

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const alertMsg = 'Welcome to the new look of News.com. Keep scrolling to discover interesting new features and news.'

  return (
    <>
      {hiddenTitle &&
        <h1 className="title-hidden">{site.siteMetadata.title}</h1>
      }
      <Header siteTitle={site.siteMetadata.title} brandLogo={BrandLogo}/>
      {showAlert &&
        <div className="container">
          <Alert dismissible onDismiss={() => setShowAlert(false)}>
            <div>
              {alertMsg}
            </div>
          </Alert>
        </div>
      }
      <main>{children}</main>
      <footer className="container">
        © {new Date().getFullYear()}, Built with
        {' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hiddenTitle: PropTypes.bool
}

Layout.defaultProps = {
  hiddenTitle: false
}

export default Layout
