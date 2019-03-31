import React from "react"
import PropTypes from "prop-types"
import Container from "../components/containers/container"

// Reference reactjs.org
// TODO: No ieda why this doesn't work, otherwise put the display logic into the JS
const media = {
  desktop: function () {
    return `@media (min-width: 652pxpx)`
  },
  phone: function () {
    return `@media (max-width: 651pxpx)`
  },
}

class TableOfContent extends React.Component {
  constructor (props) {
    super(props)
    // only work for small screen
    this.state = { isOpen: false }
  }

  _closeMenu = () => {
    this.setState({ isOpen: false })
  }

  _toggleMenu = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  // Little hack for <a> event bubbling
  handleClick = event => {
    const target = event.target
    if (target.tagName === "A") {
      this._closeMenu()
    }
  }

  render () {
    const { isOpen } = this.state
    const menuState = (isOpen) ? "open" : "close"
    const tocContent = <div dangerouslySetInnerHTML={{ __html: this.props.toc }}/>

    // TODO: No idea how to build TOC from raw HTML to JSX element
    // Workaround: Use a button to close
    return (
      <>
        <Container className="blog-toc">
          {tocContent}
        </Container>

        <Container className="blog-toc blog-toc-phone" data-menu={menuState} onClick={this.handleClick}>
          {tocContent}
        </Container>

        <div className="floating-menu" data-menu={menuState}>
          <span className="sign" onClick={this._toggleMenu}>+</span>
        </div>
      </>
    )
  }
}

TableOfContent.propTypes = {
  toc: PropTypes.string.isRequired,
}

export default TableOfContent
