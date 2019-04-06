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
import "./layout.css"

const Layout = ({ header, left, right }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQueryInBlog {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} isFullPageLayout={true} />
        <div className="layoutSmallScreenPadding">
          <div className="layout-header">{header}</div>

          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem" }}>
            <main style={{ minWidth: "300px", flex: "1 1 300px" }}>{left}</main>
            {/* TODO: hardcode the value first */}
            <div
              style={{
                flex: "0 0 250px",
                marginLeft: "1.0875rem",
                boxShadow: "rgba(0, 0, 0, 0.15) 1px 0px 5px",
                marginRight: "-1.0875rem",
                backgroundColor: "#f6f8fa"
              }}
            >
              {right}
            </div>
          </div>

          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  header: PropTypes.node.isRequired,
  left: PropTypes.node,
  right: PropTypes.node,
}

export default Layout
