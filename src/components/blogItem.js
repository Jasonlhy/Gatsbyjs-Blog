import React from 'react'
import { Link } from 'gatsby'
import classNames from "classnames"

import { OuterContainer, ShadowContainer } from "../components/containers"
import TagList from "../components/tagList"
import PropTypes from "prop-types"

import styles from "./blogItem.module.css"

const BlogItem = function(props) {
  console.log("styles: ", styles)
  const {slug, excerpt, tags, date, title, navigateHandler, isFocus} = props
  const blogItemClasses = (isFocus) ? classNames(styles.blogItem, styles.blogItemFocus) : styles.blogItem

  return (
    <Link className={styles.blogItemLink}
      key={slug}
      to={slug}
      data-slug={slug}
      onClick={navigateHandler}>

      <ShadowContainer className={blogItemClasses}>
        <article key={slug}>
          <div className={styles.blogItemInfo}
            style={{
              marginBottom: "1.0875rem"
            }}>

            <h2 itemProp="name">{title}</h2>
            <time itemProp="datePublished">{date}</time>
            <TagList tags={tags} />
          </div>

          <p className={styles.exceptContainer}
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: excerpt }} />
        </article>
      </ShadowContainer>
    </Link>
  )
}

BlogItem.propTypes = {
  slut: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navigateHandler: PropTypes.func,
  isFocus: PropTypes.bool.isRequired
}

export default BlogItem
