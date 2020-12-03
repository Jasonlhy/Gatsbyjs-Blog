import React from "react"
import PropTypes from "prop-types"

// TODO: Hard code
const containerStyle = {
  marginLeft: "-1.0875rem",
  marginRight: "-1.0875rem",
}

/**
 * Outer Container with -1.0875rem marginLeft, marginRight
 * Pass the props directly to div container
 */
const OuterContainer = props => {
  return <div style={containerStyle} {...props} />
}

OuterContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default OuterContainer
