import Typography from "typography"
import GrandView from "typography-theme-grand-view"

const fontFamily = ["Open Sans", "source-han-sans-traditional", "BlinkMacSystemFont", "-apple-system",
  "system-ui", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
  "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"]

GrandView.headerFontFamily = fontFamily
GrandView.bodyFontFamily = fontFamily
GrandView.baseFontSize = "16px"
GrandView.baseLineHeight = 1.7
GrandView.googleFonts = []
GrandView.scaleRatio = 1.6
GrandView.headerColor = "#070908"
GrandView.bodyColor = "#555555"
GrandView.overrideThemeStyles = ({ rhythm }, options) => ({
  "a": {
    color: "rgb(86,109,251)",
    textDecoration: "none"
  },
  ".page-title": {
    fontWeight: 900
  },
  "a:hover,a:active": {
    color: options.bodyColor,
    textDecoration: "underline"
  },
  "h1:first-child,h2:first-child,h3:first-child": {
    marginTop: 0
  },
  ".blog-toc": {
    width: "100%"
  },
  ".blog-list": {
    marginBottom: rhythm(1)
  },
  ".blog-item": {
    marginTop: rhythm(1),
  },
  ".blog-item h2,.small-margin-bottom": {
    marginBottom: rhythm(0.3)
  },
  ".blog-item .except-container": {
    marginBottom: rhythm(1)
  },
  ".pagination": {
    marginLeft: "-1.0875rem",
    marginRight: "-1.0875rem",
    marginBottom: rhythm(1)
  },
  ".blog-post-container": {
    marginBottom: rhythm(1)
  },
  // https://helpx.adobe.com/fonts/using/font-events.html#Stylingfallbackfontsusingfontevents
  ".wf-loading h1, .wf-loading p": {
    visibility: "hidden"
  },
  ".wf-active h1, .wf-active p, .wf-inactive h1, .wf-inactive p": {
    visibility: "visible"
  }
})

const typography = new Typography(GrandView)
// const typography = new Typography(GrandView)
export default typography
