import React from "react"
import PropTypes from "prop-types"
import TagLabel from "./tagLabel"

const TagList = props => {
  if (!props.tags) {
    return (<></>)
  }

  return (
    <div style={{
      fontSize: "80%"
    }}>
      {props.tags.map(tag => {
        return (
          <div style={{
            display: "inline-block",
            marginRight: "5px",
          }}>
            <TagLabel tag={tag} isClickable={true} />
          </div>
        )
      })}
    </div>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
}

export default TagList
