import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
const _ = require("lodash")

const TagList = props => {
  if (!props.tags) {
    return (<></>)
  }

  const tagStyle = {
    paddingLeft: "5px",
    paddingRight: "5px",
    backgroundColor: "#757de8",
    marginRight: "5px",
    color: "white"
  }

  return (
    <div style={{
      fontSize: "80%"
    }}>
      {props.tags.map(tag => {
        return (
          <span key={tag}>
            <Link to={`/tags/${_.kebabCase(tag)}/`} style={tagStyle}>
              {tag}
            </Link>
          </span>
        )
      })}
    </div>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
}

export default TagList
