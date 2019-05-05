import React from "react"
import { Link } from "gatsby"

export default function(props) {
  const { tag, isClickable } = props

  const tagStyle = {
    paddingLeft: "5px",
    paddingRight: "5px",
    backgroundColor: "#757de8",
    color: "white"
  }

  if (isClickable){
    return (
      <span key={tag}>
        <Link to={`/tags/${_.kebabCase(tag)}/`} style={tagStyle}>
          {tag}
        </Link>
      </span>
    )
  } else {
    return (
      <span key={tag} style={tagStyle}>
        {tag}
      </span>
    )
  }
}
