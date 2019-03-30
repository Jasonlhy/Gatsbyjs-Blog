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

  _openMenu = () => {
    this.setState({ isOpen: true })
    console.log("Menu is clicked")
  }

  _CloseMenu = () => {
    this.setState({ isOpen: false })
    console.log("Menu is close")
  }

  // Little hack for <a> event bubbling
  handleClick = event => {
    const target = event.target
    if (target.tagName === "A") {
      this._CloseMenu()
    }
  }

  render () {
    const { isOpen } = this.state

    const smallMenuStyle = {
      display: (isOpen) ? "block" : "none",
      padding: "1.0875rem",
      lineHeight: 1.5
    }

    const closeButtonStyle = {
      position: "absolute",
      right: 10,
      top: 10
    }

    const menuContainerStyle = {
      display: (!isOpen) ? "block" : "none"
    }

    const tocContent = <div dangerouslySetInnerHTML={{ __html: this.props.toc }}/>

    let arrow1Style = {
      "transform": "translate(8px, -4px) rotate(180deg)",
      "transition": "-webkit-transform 0.2s ease 0s, transform 0.2s ease 0s"
    }
    let arrow2Style = {
      "transform": "translate(-7px, 15px) rotate(360deg)",
      "transition": "-webkit-transform 0.2s ease 0s, transform 0.2s ease 0s"
    }
    let svgArrow1 = <svg style={arrow1Style} viewBox="0 0 926.23699 573.74994" version="1.1" x="0px" y="0px" width="15" height="15" class="css-cf8c4v"><g transform="translate(904.92214,-879.1482)"><path d="
    m -673.67664,1221.6502 -231.2455,-231.24803 55.6165,
    -55.627 c 30.5891,-30.59485 56.1806,-55.627 56.8701,-55.627 0.6894,
    0 79.8637,78.60862 175.9427,174.68583 l 174.6892,174.6858 174.6892,
    -174.6858 c 96.079,-96.07721 175.253196,-174.68583 175.942696,
    -174.68583 0.6895,0 26.281,25.03215 56.8701,
    55.627 l 55.6165,55.627 -231.245496,231.24803 c -127.185,127.1864
    -231.5279,231.248 -231.873,231.248 -0.3451,0 -104.688,
    -104.0616 -231.873,-231.248 z
  " fill="currentColor"></path></g></svg>
    let svgArrow2 = <svg style={arrow2Style} viewBox="0 0 926.23699 573.74994" version="1.1" x="0px" y="0px" width="15" height="15" class="css-cf8c4v"><g transform="translate(904.92214,-879.1482)"><path d="
    m -673.67664,1221.6502 -231.2455,-231.24803 55.6165,
    -55.627 c 30.5891,-30.59485 56.1806,-55.627 56.8701,-55.627 0.6894,
    0 79.8637,78.60862 175.9427,174.68583 l 174.6892,174.6858 174.6892,
    -174.6858 c 96.079,-96.07721 175.253196,-174.68583 175.942696,
    -174.68583 0.6895,0 26.281,25.03215 56.8701,
    55.627 l 55.6165,55.627 -231.245496,231.24803 c -127.185,127.1864
    -231.5279,231.248 -231.873,231.248 -0.3451,0 -104.688,
    -104.0616 -231.873,-231.248 z
  " fill="currentColor"></path></g></svg>

    // TODO: No idea how to build TOC from raw HTML to JSX element
    // Workaround: Use a button to close
    return (
      <>
        <Container className="blog-toc">
          {tocContent}
        </Container>

        <Container className="blog-toc blog-toc-phone" style={smallMenuStyle} onClick={this.handleClick}>
          {tocContent}
          <button class="blog-toc-close-button" style={closeButtonStyle} onClick={this._CloseMenu}>關閉</button>
        </Container>

        <div className="menu-button-container" style={menuContainerStyle}>
          <button className="menu-button" onClick={this._openMenu} style={{
            borderRadius: "50%"
          }}>
            <div style={{
              padding: "5px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              <div style={{
                height: "30px"
              }}>
                {svgArrow1}
                {svgArrow2}
              </div>
            </div>
          </button>
        </div>
      </>
    )
  }
}

TableOfContent.propTypes = {
  toc: PropTypes.string.isRequired,
}

export default TableOfContent
