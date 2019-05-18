import React, { useEffect, useState } from "react"
import PropTypes, { func } from "prop-types"
import { Container } from "../components/containers"

import smoothscroll from "smoothscroll-polyfill"
import addIcon from "../icons/add.svg"

const TableOfContent = function (props) {
  const [isOpen, setIsOpen] = useState(false)

  // Like component did mount and component did unmount
  useEffect(function () {
    // Delay the polyfill step
    // https://github.com/gatsbyjs/gatsby/issues/309
    smoothscroll.polyfill()
  })

  const _closeMenu = function () {
    setIsOpen(false)
  }

  const handleToggleMenu = function () {
    setIsOpen(!isOpen)
  }

  /**
   * Scroll to the heading with JavaScript instead of using browser anchor because it will lose the router information
   *
   * @param {*} event - OnClick event which targets <a> element
   * @memberof TableOfContent
   */
  const _scrollToHeading = function (event) {
    // need to use /g flag to replaceAll...
    const target = event.target
    const headingAnchor = target.href
    const headingIdx = headingAnchor.indexOf("#")

    if (headingIdx >= 0) {
      const headingIdSelector = decodeURI(headingAnchor.substring(headingIdx))
      const heading = document.querySelector(headingIdSelector)

      if (heading) {
        heading.scrollIntoView({ behavior: "smooth" })
        // const { top, left } = heading.getBoundingClientRect()
        // window.scrollTo(left, top)
        event.preventDefault()
      } else {
        console.error("Can't find heading with Id selector: ", headingIdSelector)
      }
    }
  }

  // Little hack for <a> event bubbling
  const handleTocClickDesktop = function(event) {
    const target = event.target
    if (target.tagName === "A") {
      _scrollToHeading(event)
    }
  }

  // Little hack for <a> event bubbling
  const handleTocClickMobile = function(event) {
    const target = event.target
    if (target.tagName === "A") {
      _scrollToHeading(event)
      _closeMenu()
    }
  }

  const menuState = (isOpen) ? "open" : "close"

  const tocContent = (
    <nav>
      <div style={{
        "background": "#d81b60",
        "margin": "-1.0875rem",
        "padding": "1.0875rem",
        "marginBottom": "1.0875rem"
      }}>
        <h3 style={{
          "color": "white",
          "marginBottom": 0
        }}>在此文章</h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.toc }} />
    </nav>
  )

  // TODO: No idea how to build TOC from raw HTML to JSX element
  // Workaround: Use a button to close
  return (
    <>
      <Container id="desktopToc"
        className="blog-toc blog-toc-desktop"
        onClick={handleTocClickDesktop}>
        {tocContent}
      </Container>

      <Container className="blog-toc blog-toc-phone"
        data-menu={menuState}
        onClick={handleTocClickMobile}>
        <div className="blog-toc-center">
          {tocContent}
        </div>
      </Container>

      <div className="floating-menu" data-menu={menuState} onClick={handleToggleMenu}>
        <img className="sign" src={addIcon} />
      </div>
    </>
  )
}

TableOfContent.propTypes = {
  toc: PropTypes.string.isRequired,
}

export default TableOfContent
