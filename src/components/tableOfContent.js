import React, { useEffect, useState, useMemo } from "react"
import PropTypes, { func } from "prop-types"
import { Container } from "./containers"

import smoothscroll from "smoothscroll-polyfill"
import addIcon from "../icons/add.svg"
import useMedia from "../hooks/use-media"
import classNames from "classnames"

import styles from "./tableOfContent.module.css"

const TableOfContent = function (props) {
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false)
  const displayType = useMedia(
    // Media queries
    ['(min-width: 550px)'],
    // Column counts (relates to above media queries by array index)
    ["Desktop"],
    // Default column count
    "Mobile"
  );
  // console.log("displayType: " + displayType);

  // Like component did mount and component did unmount
  useEffect(function () {
    // Delay the polyfill step
    // https://github.com/gatsbyjs/gatsby/issues/309
    smoothscroll.polyfill()
  })

  const _closeMenu = function () {
    setIsFloatingMenuOpen(false)
  }

  const handleToggleMenu = function () {
    setIsFloatingMenuOpen(!isFloatingMenuOpen)
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
        event.preventDefault()
      } else {
        console.error("Can't find heading with Id selector: ", headingIdSelector)
      }
    }
  }

  // Little hack for <a> event bubbling
  const handleTocClickDesktop = function (event) {
    const target = event.target
    if (target.tagName === "A") {
      _scrollToHeading(event)
    }
  }

  // Little hack for <a> event bubbling
  const handleTocClickMobile = function (event) {
    const target = event.target
    if (target.tagName === "A") {
      _scrollToHeading(event)
      _closeMenu()
    }
  }

  const menuState = useMemo(() => (isFloatingMenuOpen) ? "open" : "close", [isFloatingMenuOpen])

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
  const toc = ((displayType) === "Desktop")
    ? <Container className={classNames(styles.toc, styles.tocDesktop)}
      onClick={handleTocClickDesktop}>
      {tocContent}
    </Container>
    : <>
      <Container className={classNames(styles.toc, styles.tocPhone)}
        data-menu={menuState}
        onClick={handleTocClickMobile}>
        <div className={styles.center}>
          {tocContent}
        </div>
      </Container>
      <div className={styles.floatingMenu} data-menu={menuState} onClick={handleToggleMenu}>
        <img className={styles.sign} src={addIcon} />
      </div>
    </>

  return (
    <>
      {toc}
    </>
  )
}

TableOfContent.propTypes = {
  toc: PropTypes.string.isRequired,
}

export default TableOfContent
