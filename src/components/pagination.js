import React from "react"
import BlogListLink from "../components/blogListLink"
import PropTypes from "prop-types"

import styles from "./pagination.module.css"

const Pagination = function (props) {
  const { previousPage, nextPage } = props

  return (
    <div className={styles.pagination}>
      { previousPage && 
        <div className={styles.paginationLink}>
          <BlogListLink pagenumber={previousPage}>上一頁</BlogListLink>
        </div> 
      }
      { nextPage && 
          <div className={styles.paginationLink}>
              <BlogListLink pagenumber={nextPage}>下一頁</BlogListLink>
          </div>
      }
    </div>
  )
}

Pagination.propTypes = {
  previousPage: PropTypes.number,
  nextPage: PropTypes.number,
}

export default Pagination
