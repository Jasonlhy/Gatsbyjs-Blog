import React from "react"
import PropTypes from "prop-types"
import TagLabel from "./tagLabel"

const TagList = props => {
  if (!props.tags) {
    return <></>
  }

  const isClickable = props.isClickable !== false

  return (
    <div>
      {props.tags.map(tag => {
        return (
          <div
            key={tag}
            style={{
              display: "inline-block",
              marginRight: "5px",
            }}
          >
            <TagLabel tag={tag} isClickable={isClickable} />
          </div>
        )
      })}
    </div>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  isClickable: PropTypes.bool,
}

export default TagList
