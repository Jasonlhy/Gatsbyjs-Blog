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
import OuterContainer from "./containers/outerContainer.js"
import Footer from "./footer.js"
import "./layout.css"

const Layout = ({ children, children2 }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} isTwoLayout={!!(children2)}/>
        <div
          className="layoutSmallScreenPadding"
          style={ children2 ? ({
            // margin: `0 1.0875rem`,
            // padding: `0px 1.0875rem 1.45rem`,
            // padding: `0px 2.175rem 1.45rem`,
            // paddingTop: 0,
          }) : ({
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          })}
        >
          {/* Chrome need minWidth no only flexBasis */}
          {children2
            ? <>
                <div style={ { display: "flex", flexWrap: "wrap" }}>
                  <main style={ { minWidth: "300px", flex: "1 1 300px" } }>{children}</main>
                  <div style={ { flex: "0 0 250px", marginLeft: "1.8rem" } }>{children2}</div>
                </div>
              </>
            : <main>{children}</main>}

          <Footer />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  children2: PropTypes.node
}

export default Layout
