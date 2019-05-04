import React from "react"
import BlogListLink from "../components/blogListLink"
import PropTypes from "prop-types"

import styles from "./pagination.module.css"

const Pagination = function (props) {
  const { previousPage, nextPage } = props

  return (
    <div className={styles.pagination}>
      { previousPage && <BlogListLink pagenumber={previousPage}>上一頁</BlogListLink> }
      { nextPage && <BlogListLink pagenumber={nextPage} style={{ float: "right" }}>下一頁</BlogListLink> }
    </div>
  )
}

Pagination.propTypes = {
  previousPage: PropTypes.number.isRequired,
  nextPage: PropTypes.number.isRequired,
}

export default Pagination
