/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const FullLayout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleFullQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} location={location} isFullPageLayout={true} />
        <div
          className="layoutSmallScreenPadding"
          style={{
            margin: `0 auto`,
            maxWidth: `100%`,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            overflow: "scroll",
          }}
        >
          <main>{children}</main>
          <Footer />
        </div>
      </>
    )}
  />
)

FullLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FullLayout
