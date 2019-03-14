import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#483D8B`,
      marginBottom: `1.45rem`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        // padding: `0.4rem 1.0875rem`,
        paddingLeft: `1.0875rem`,
        paddingTop: `0.6rem`, // don't know why safari have bug
        paddingBottom: `0.6rem` // don't know why safari have bug
      }}
    >
      <h1 style={{
        margin: 0,
        display: "inline-block",
        padding: "0.4rem",
        marginLeft: "-0.4rem",
        color: "#FCFCF2",
        backgroundColor: "#070809"
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
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
