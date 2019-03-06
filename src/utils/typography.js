import Typography from "typography"
import GrandView from "typography-theme-grand-view"

GrandView.overrideThemeStyles = ({ rhythm }, options) => ({
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
    marginTop: rhythm(1)
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
    marginBottom: rhythm(1)
  },
  // '.blog-heading ' : {
  //     padding: rhythm(1)
  // },
  ".blog-item a": {
    padding: rhythm(1)
  },
  ".blog-post-container": {
    marginBottom: rhythm(1)
  },
  ".blog-post-content": {
    padding: rhythm(1)
  }
})

const typography = new Typography(GrandView)
// const typography = new Typography(GrandView)
export default typography
