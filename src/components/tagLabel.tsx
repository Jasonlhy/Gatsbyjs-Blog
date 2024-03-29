import React from "react"
import { Link } from "gatsby"
import _ from "lodash"

import * as styles from "./tagLabel.module.css"

export default function (props) {
  const { tag, isClickable, count } = props

  if (isClickable) {
    return (
      <span key={tag}>
        <Link to={`/tags/${_.kebabCase(tag)}/`} className={styles.label}>
          {tag}
          {count && ` (${count})`}
        </Link>
      </span>
    )
  } else {
    return (
      <span
        key={tag}
        className={styles.label}
        style={{
          // hard code first
          color: "#757de8",
        }}
      >
        {tag}
        {count && ` (${count})`}
      </span>
    )
  }
}
