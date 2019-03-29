import React from "react"
import PropTypes from "prop-types"

const containerStyle = {
  padding: "1.0875rem" // Hard code first, align with the header
}

/**
 * Default Container with 1.0875rem padding
 * Pass the props directly to div container
 */
const Container = props => {
  return (
    <div style={containerStyle} {...props} />
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
