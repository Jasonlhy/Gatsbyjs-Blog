import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const BlogListLink = props => {
  const { pagenumber } = props

  return pagenumber && pagenumber > 1 ? (
    <Link to={`/blogs/${pagenumber}`} {...props} />
  ) : (
    <Link to={`/blogs`} {...props} />
  )
}

BlogListLink.propTypes = {
  children: PropTypes.node,
  pagenumber: PropTypes.number.isRequired,
}

export default BlogListLink
