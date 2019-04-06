import React from "react"
import PropTypes from "prop-types"

const containerStyle = {
  boxShadow: "0 5px 30px rgba(0,0,0,0.15)",
  borderRadius: "5px",
  padding: "1.0875rem" // Hard code first, align with the header
}

/**
 * Rounded Default Container with 1.0875rem padding
 *
 * Pass the props directly to div container
 */
const RoundedContainer = props => {
  return (
    <div style={containerStyle} {...props}/>
  )
}

RoundedContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default RoundedContainer
