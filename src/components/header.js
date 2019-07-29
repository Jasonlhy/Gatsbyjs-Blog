import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import logo from "../icons/logo_transparent.png"
import BlogListLink from "../components/blogListLink"

const headerStyle = {
  // TODO: Hard code first
  display: "flex",
  alignItems: "center",
  marginLeft: "1.0875rem",
  maxWidth: 960,
  paddingLeft: `1.0875rem`,
  paddingTop: `0.6rem`,
  paddingBottom: `0.6rem`,
}

const centerHeaderStyle = Object.assign(Object.assign({}, headerStyle), {
  margin: "0 auto",
})

/**
 * Header of all Layouts
 */
const Header = function ({ siteTitle, isFullPageLayout, highlightTab }) {
  const isBlogs = (typeof window !== "undefined") && window.location.pathname.includes("blogs") || highlightTab === "blogs"

  return (
    <header
      style={{
        background: `#3f51b5`,
        marginBottom: `1.08875rem`,
      }}
    >
      <div
        className={isFullPageLayout ? "headerSmallScreenPadding" : ""}
        style={isFullPageLayout ? headerStyle : centerHeaderStyle}
      >
        <img
          key={"website-logo"}
          src={logo}
          style={{
            marginLeft: "-0.4rem",
            height: "50px",
            width: "52px",
            marginBottom: 0,
          }}
        />
        <h1
          style={{
            display: "inline",
            margin: 0,
            padding: "0.4rem",
            color: "#DBDBDB",
            fontFamily: "liberation-sans",
            fontWeight: 700,
            fontStyle: "normal",
          }}
        >
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
              backgroundColor: "inherit",
            }}
          >
            {siteTitle}
          </Link>
        </h1>

        <span
          style={{
            backgroundColor: isBlogs ? "#344294" : "inherit",
            marginLeft: `.5rem`,
            paddingLeft: ".5rem",
            paddingRight: ".5rem",
          }}
        >
          <BlogListLink
            pagenumber={1}
            style={{
              color: `white`,
              textDecoration: `none`,
              backgroundColor: "inherit",
            }}
          >
            文章列表
          </BlogListLink>
        </span>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  isFullPageLayout: PropTypes.bool,
  highlightTab: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
