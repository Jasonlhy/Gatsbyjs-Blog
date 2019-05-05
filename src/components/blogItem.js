import React from "react"
import ReactDOM from 'react-dom'
import { Link } from "gatsby"
import classNames from "classnames"

import { OuterContainer, ShadowContainer } from "../components/containers"
import TagList from "../components/tagList"
import PropTypes from "prop-types"

import styles from "./blogItem.module.css"

class BlogItem extends React.Component {
  /**
   * const { pageY, pageX } = location.state
   * const { currentPage, numPages } = pageContext
   *
   * @param {*} props
   *
   */
  constructor (props) {
    super(props)
		this.state = {}
  }

	scrollToFocus = () => {
		const { isFocus } = this.props

		if (isFocus){
			const focusBlogItem = ReactDOM.findDOMNode(this)

			// Request browser to scroll as soon as possible
      var requestAnimationFrame = window.requestAnimationFrame 
        || window.mozRequestAnimationFrame 
        || window.webkitRequestAnimationFrame 
        || window.msRequestAnimationFrame;
			setTimeout(function(){
        requestAnimationFrame(function(){
          focusBlogItem.scrollIntoView();
        })
			}, 0);
		}
	}

	componentDidMount = () => {
		this.scrollToFocus()
	}

	componentDidUpdate = () => {
		this.scrollIntoView()
	}

  render = () => {
    const { slug, excerpt, tags, date, title, navigateHandler, isFocus } = this.props
    const blogItemClasses = (isFocus) ? classNames(styles.blogItem, styles.blogItemFocus) : styles.blogItem

    return (
      <div key={slug}
        className={styles.blogItemLink}
        to={slug}
        data-slug={slug}
        onClick={navigateHandler}>

        <ShadowContainer className={blogItemClasses}>
          <article>
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
      </div>
    )
  }
}

BlogItem.propTypes = {
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navigateHandler: PropTypes.func,
  isFocus: PropTypes.bool.isRequired
}

export default BlogItem
