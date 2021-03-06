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
import useMedia from "../hooks/use-media"
import "./layout.css"

/**
 * The layout designed for blog, with header left and right component
 *
 * @param {*} param0
 */
const BlogLayout = ({ header, left, right }) => {
  // TODO: fix back page issue
  const deviceType =
    (typeof window !== "undefined" &&
      window.matchMedia("(min-width: 550px)")) ||
    "Mobile"

  const displayType = useMedia(
    // Media queries
    ["(min-width: 550px)"],
    // Column counts (relates to above media queries by array index)
    ["Desktop"],
    // Default column count
    deviceType
  )

  return (
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
          <Header
            siteTitle={data.site.siteMetadata.title}
            isFullPageLayout={true}
            highlightTab="blogs"
          />
          <div className="layoutSmallScreenPadding">
            <div className="layout-header">{header}</div>

            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <main style={{ minWidth: "250px", flex: "1 0 250px" }}>
                {left}
              </main>

              {displayType === "Desktop"
                ? <div
                  style={{
                    flex: "0 0 250px",
                    marginLeft: "1.0875rem",
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2px",
                    marginRight: "-1.0875rem",
                    backgroundColor: "#f6f8fa",
                  }}
                >
                  {right}
                </div>
                : right}
            </div>

            <Footer />
          </div>
        </>
      )}
    />
  )
}

BlogLayout.propTypes = {
  header: PropTypes.node.isRequired,
  left: PropTypes.node,
  right: PropTypes.node,
}

export default BlogLayout
