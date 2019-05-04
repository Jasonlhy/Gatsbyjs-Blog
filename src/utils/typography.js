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
// GrandView.backgroundColor = "#f5f5f6"
// GrandView.bodyColor = "#f5f5f6"
GrandView.overrideThemeStyles = ({ rhythm }, options) => ({
  "body": {
    "background": "#f5f5f6"
  },
  "a": {
    color: "#757de8",
    textDecoration: "none",
  },
  ".page-title": {
    fontWeight: 900
  },
  /* So difficult to customize link color */
  "a:hover": {
    backgroundColor: "#757de8",
    color: "white"
  },
  "h1:first-child,h2:first-child,h3:first-child": {
    marginTop: 0
  },
  ".blog-toc": {
    width: "100%"
  },
  // https://helpx.adobe.com/fonts/using/font-events.html#Stylingfallbackfontsusingfontevents
  // ".wf-loading h1, .wf-loading p": {
  // visibility: "hidden"
  // },
  // ".wf-active h1, .wf-active p, .wf-inactive h1, .wf-inactive p": {
  // visibility: "visible"
  // }
})

const typography = new Typography(GrandView)
// const typography = new Typography(GrandView)
export default typography
