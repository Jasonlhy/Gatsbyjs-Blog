import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, isTwoLayout }) => (
  <header
    style={{
      background: `#483D8B`,
      marginBottom: `1.45rem`
    }}
  >
    <div
      className="headerSmallScreenPadding"
      style={isTwoLayout ? {
        // TODO: Hard code first
        marginLeft: "1.0875rem",
        maxWidth: 960,
        // padding: `0.4rem 1.0875rem`,
        paddingLeft: `1.0875rem`,
        paddingTop: `0.6rem`, // don't know why safari have bug
        paddingBottom: `0.6rem` // don't know why safari have bug
      } : {
        margin: `0 auto`,
        // margin: (isTwoLayout) ? `0.4 auto`,
        maxWidth: 960,
        // padding: `0.4rem 1.0875rem`,
        paddingLeft: `1.0875rem`,
        paddingTop: `0.6rem`, // don't know why safari have bug
        paddingBottom: `0.6rem` // don't know why safari have bug
      }}
    >
      <h1 style={{
        margin: 0,
        padding: "0.4rem",
        marginLeft: "-0.4rem",
        color: "#FCFCF2",
        fontFamily: "liberation-sans",
        fontWeight: 700,
        fontStyle: "normal"
      }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
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
  isTwoLayout: PropTypes.bool
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
