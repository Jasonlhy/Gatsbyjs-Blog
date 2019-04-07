import React from "react"
import PropTypes from "prop-types"

const containerStyle = {
  boxShadow: "0 5px 30px rgba(0,0,0,0.15)",
  padding: "1.0875rem" // Hard code first, align with the header
}

/**
 * Rounded Default Container with 1.0875rem padding
 *
 * Pass the props directly to div container
 */
const ShadowContainer = props => {
  return (
    <div style={containerStyle} {...props}/>
  )
}

ShadowContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default ShadowContainer
