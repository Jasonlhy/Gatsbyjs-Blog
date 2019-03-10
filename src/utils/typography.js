import Typography from "typography"
import GrandView from "typography-theme-grand-view"

const fontFamily = ["Open Sans", "Microsoft JhengHei", "BlinkMacSystemFont", "-apple-system",
  "system-ui", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
  "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"]

GrandView.headerFontFamily = fontFamily
GrandView.bodyFontFamily = fontFamily
GrandView.baseFontSize = "14px"
GrandView.baseLineHeight = 1.7
GrandView.googleFonts = []
GrandView.scaleRatio = 2.5
GrandView.overrideThemeStyles = ({ rhythm }, options) => ({
  "body": {
    backgroundColor: "#f6f8fa",
    // fontFamily: "'Arvo', 'sans-serif'"
  },
  "h1:first-child,h2:first-child,h3:first-child": {
    marginTop: 0
  },
  ".blog-toc": {
    marginTop: rhythm(0.9),
    marginRight: rhythm(0.5)
  },
  ".blog-list": {
    marginBottom: rhythm(1)
  },
  ".blog-item": {
    marginTop: rhythm(1),
    marginLeft: rhythm(-1),
    marginRight: rhythm(-1),
  },
  "time": { // when displayed as block
    marginBottom: rhythm(1)
  },
  ".blog-item h2,.small-margin-bottom": {
    marginBottom: rhythm(0.3)
  },
  ".blog-item .except-container": {
    marginBottom: rhythm(1)
  },
  ".pagination": {
    marginLeft: rhythm(-1),
    marginRight: rhythm(-1),
    marginBottom: rhythm(1)
  },
  // '.blog-heading ' : {
  //     padding: rhythm(1)
  // },
  ".blog-item a": {
    padding: rhythm(1),
  },
  ".blog-post-container": {
    marginBottom: rhythm(1)
  },
  ".blog-post-content": {
    padding: rhythm(1),
    marginLeft: rhythm(-1),
    marginRight: rhythm(-0.8)
  }
})

const typography = new Typography(GrandView)
// const typography = new Typography(GrandView)
export default typography
