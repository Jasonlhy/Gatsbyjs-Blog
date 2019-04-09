import React from "react"
import PropTypes from "prop-types"
import { Container } from "../components/containers"

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
    this.onWindowScroll = null
  }

  // componentDidMount && componentWillUnmount is methods in ES6 class
  // But method is syntatic sugar to this.function in function prototype
  // Use arrow function here to reference this.onWindowScroll to avoid declare another variable for reference of the caller function
  componentDidMount = () => {
    let desktopToc = document.querySelector("#desktopToc")
    let desktopFixed = desktopToc && desktopToc.querySelector("#desktopTopFixed")
    let offsetTop = desktopToc && desktopToc.offsetTop

    if (desktopToc && desktopFixed) {
      this.onWindowScroll = function () {
        console.log("window.scrollY", window.scrollY)
        console.log("offsetTop", offsetTop)
        
        // TODO: Will have some delay
        // https://stackoverflow.com/questions/5209814/can-i-position-an-element-fixed-relative-to-parent
        if (window.scrollY > offsetTop) {
          desktopFixed.style.transform = `translate(0, -${offsetTop}px)`
        } else {
          desktopFixed.style.transform = ""
        }
      }

      window.addEventListener("scroll", this.onWindowScroll)
    } else {
      console.log("error")
    }
  }

  componentWillUnmount = () => {
    if (this.onWindowScroll) {
      window.removeEventListener("scroll", this.onWindowScroll)
    }
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
    const tocContent = (
      <nav>
        <h3 style={{
          marginBottom: "1.0875rem"
        }}>在此文章</h3>
        <div dangerouslySetInnerHTML={{ __html: this.props.toc }} />
      </nav>
    )

    // TODO: No idea how to build TOC from raw HTML to JSX element
    // Workaround: Use a button to close
    return (
      <>
        <Container id="desktopToc" className="blog-toc">
          <div id="desktopTopFixed" style={{
            position: "fixed"
          }}>
            {tocContent}
          </div>
        </Container>

        <Container className="blog-toc blog-toc-phone" data-menu={menuState} onClick={this.handleClick}>
          <div className="blog-toc-center">
            {tocContent}
          </div>
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
