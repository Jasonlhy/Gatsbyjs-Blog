import React from "react"
import PropTypes from "prop-types"

const TagList = props => {
  return (
    <>
        {props.tags && <div style={{
          fontSize: "80%"
        }}>
          {
            props.tags.map(tag => {
              return <span
                key={tag}
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  backgroundColor: "#757de8",
                  marginRight: "5px",
                  color: "white"
                }}>{tag}</span>
            })
          }
        </div>}
    </>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
}

export default TagList
