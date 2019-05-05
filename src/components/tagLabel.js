import React from "react"
import { Link } from "gatsby"
import _ from "lodash"

export default function (props) {
  const { tag, isClickable, count } = props

  const tagStyle = {
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "5px",
    backgroundColor: "#757de8",
    color: "white"
  }

  if (isClickable) {
    return (
      <span key={tag}>
        <Link to={`/tags/${_.kebabCase(tag)}/`} style={tagStyle}>
          {tag}{count && ` (${count})`}
        </Link>
      </span>
    )
  } else {
    return (
      <span key={tag} style={tagStyle}>
        {tag}{count && ` (${count})`}
      </span>
    )
  }
}
