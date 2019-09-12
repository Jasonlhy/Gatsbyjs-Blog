import React from "react"
import BlogListLink from "../components/blogListLink"
import PropTypes from "prop-types"

import styles from "./pagination.module.css"
import classNames from "classnames"

const Pagination = function(props) {
  const { previousPage, nextPage } = props
  const paginationClassName = previousPage
    ? classNames(styles.pagination, styles.bothSide)
    : classNames(styles.pagination, styles.end)

  return (
    <div className={paginationClassName}>
      {previousPage && (
        <div className={styles.paginationLink}>
          <BlogListLink pagenumber={previousPage}>上一頁</BlogListLink>
        </div>
      )}
      {nextPage && (
        <div className={styles.paginationLink}>
          <BlogListLink pagenumber={nextPage}>下一頁</BlogListLink>
        </div>
      )}
    </div>
  )
}

Pagination.propTypes = {
  previousPage: PropTypes.number,
  nextPage: PropTypes.number,
}

export default Pagination
