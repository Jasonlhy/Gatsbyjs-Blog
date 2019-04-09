import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const headerStyle = {
  // TODO: Hard code first
  marginLeft: "1.0875rem",
  maxWidth: 960,
  paddingLeft: `1.0875rem`,
  paddingTop: `0.6rem`, // don't know why safari have bug
  paddingBottom: `0.6rem` // don't know why safari have bug
}

const centerHeaderStyle = Object.assign(Object.assign({}, headerStyle), {
  margin: "0 auto"
})

const Header = ({ siteTitle, isFullPageLayout }) => (
  <header
    style={{
      background: `#483D8B`,
      marginBottom: `1.08875rem`
    }}
  >
    <div
      className={ isFullPageLayout ? "headerSmallScreenPadding" : ""}
      style={isFullPageLayout ? headerStyle : centerHeaderStyle}
    >
      <h1 style={{
        margin: 0,
        padding: "0.4rem",
        marginLeft: "-0.4rem",
        color: "#DBDBDB",
        fontFamily: "liberation-sans",
        fontWeight: 700,
        fontStyle: "normal"
      }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            backgroundColor: "inherit"
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  isFullPageLayout: PropTypes.bool
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
