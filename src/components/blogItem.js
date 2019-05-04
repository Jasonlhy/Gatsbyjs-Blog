import React from 'react'
import { Link } from 'gatsby'
import { OuterContainer, ShadowContainer } from "../components/containers"
import TagList from "../components/tagList"
import PropTypes from "prop-types"

import "./blogItem.css"

const BlogItem = function(props) {
  const {slug, excerpt, tags, date, title, navigateHandler, isFocus} = props
  const blogItemClass = (isFocus) ? "blog-item focus" : "blog-item"

  return (
    <Link className="blog-item-link"
      key={slug}
      to={slug}
      data-slug={slug}
      onClick={navigateHandler}>

      <ShadowContainer className={blogItemClass}>
        <article key={slug}>
          <div className="blog-item-info"
            style={{
              marginBottom: "1.0875rem"
            }}
          >
            <h2 itemProp="name">{title}</h2>
            <time itemProp="datePublished">{date}</time>
            <TagList tags={tags} />
          </div>

          <p className="except-container"
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
  blogItemClass: PropTypes.string.isRequired,
  isFocus: PropTypes.bool.isRequired
}

export default BlogItem
