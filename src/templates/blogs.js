import React from "react"
import { graphql, Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tagList"
import { OuterContainer, ShadowContainer } from "../components/containers"
import BlogListLink from "../components/blogListLink"

import "./blogs.css"

class BlogListPage extends React.Component {
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

  /**
   * Get the window scroll offset
   */
  getWindowScrolOffset () {
    let supportPageOffset = window.pageXOffset !== undefined
    let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")

    let x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft
    let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop

    return { x, y }
  }

  /**
   * Navigate to the artciel and pass the window location to article
   */
  navigateToArticle = event => {
    event.preventDefault()

    const anchorElement = event.currentTarget
    const slug = anchorElement.dataset.slug // href will be resolved in full URL

    const { x, y } = this.getWindowScrolOffset()
    const { pageContext } = this.props
    const { currentPage } = pageContext

    navigate(
      slug,
      {
        state: {
          fromBlogs: true,
          pagenumber: currentPage,
          pageY: y,
          pageX: x
        }
      }
    )
  }

  /**
   * Scroll to the previous position if the position is passed back from the artcile
   *
   * @memberof BlogListPage
   */
  componentDidMount = () => {
    const { location } = this.props

    if (location.state) {
      const { pageX, pageY, slug } = location.state
      // console.log("Element from point: ", { pageX, pageY, slug })

      if (pageX >= 0 || pageY >= 0) {
        // It doesn't work to scroll immediately
        // I don't know why
        window.setTimeout(() => {
          window.scrollTo({
            top: pageY,
            left: pageX
          })
        }, 100)
      }
    }
  }

  render () {
    const { data, pageContext, location } = this.props
    const { currentPage, numPages } = pageContext
    const posts = data.allMarkdownRemark.edges
    const focusSlug = location && location.state && location.state.slug // focus blog item from backpage

    // Pagination
    // blogs/1 is not generated
    const previousPage = (currentPage === 1) ? undefined : (currentPage - 1)
    const nextPage = (currentPage === numPages) ? undefined : (currentPage + 1)

    return (
      <Layout>
        <SEO title="文章列表" keywords={[`programming`, `blog`, `life`]} />
        <h1 className="page-title">文章列表 - 頁 {currentPage}</h1>

        <OuterContainer className="blog-list">
          {posts.map(({ node }) => {
            const { title, date, tags } = node.frontmatter
            const excerpt = node.excerpt
            const slug = node.fields.slug
            const blogItemClass = (focusSlug === slug) ? "blog-item focus" : "blog-item"

            return (
              <Link className="blog-item-link"
                key={slug}
                to={slug}
                data-slug={slug}
                onClick={this.navigateToArticle}>

                <ShadowContainer className={blogItemClass}>
                  <article key={slug}>
                    <div className="blog-item-info"
                      style={{
                        marginBottom: "1.0875rem"
                      }}
                    >
                      <h2 itemProp="name">{title}</h2>
                      <time itemProp="datePublished">{date}</time>
                      <TagList tags={tags} />
                    </div>

                    <p className="except-container"
                      itemProp="description"
                      dangerouslySetInnerHTML={{ __html: excerpt }} />
                  </article>
                </ShadowContainer>
              </Link>
            )
          })}
        </OuterContainer>

        <div className="pagination">
          { previousPage && <BlogListLink pagenumber={previousPage}>上一頁</BlogListLink> }
          { nextPage && <BlogListLink pagenumber={nextPage} style={{ float: "right" }}>下一頁</BlogListLink> }
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      limit: $limit,
      skip: $skip
    ) {
        edges {
          node {
            fields {
              slug
            },
            excerpt(format: HTML, pruneLength:150)
            frontmatter {
              title
              date(formatString: "YYYY-MM-DD")
              path
              tags
            }
          }
        }
    }
  }
`

export default BlogListPage
