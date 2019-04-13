import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const BlogListLink = props => {
  const { pageNumber } = props

  return (pageNumber && pageNumber > 1)
    ? (<Link to={`/blogs/${pageNumber}`} {...props} />)
    : (<Link to={`/blogs`} {...props} />)
}

BlogListLink.propTypes = {
  children: PropTypes.node,
  pageNumber: PropTypes.number.isRequired
}

export default BlogListLink
