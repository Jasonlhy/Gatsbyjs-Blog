import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/containers/container"
import RoundedContainer from "../components/containers/rounedContainer"
import OuterContainer from "../components/containers/outerContainer"
import "./blogs.css"

const HomePage = ({ data, pageContext }) => {
  // For pagination
  console.log("pageContext ", pageContext)
  const currentPage = pageContext.currentPage
  const numPages = pageContext.numPages
  const previousPage = (currentPage === 1) ? undefined : (currentPage - 1)

  // blogs/1 is not generated
  const nextPage = (currentPage === numPages) ? undefined : (currentPage + 1)
  let posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="文章列表" keywords={[`programming`, `blog`, `life`]} />
      <h1 class="page-title">文章列表 - 頁 {currentPage}</h1>
      <OuterContainer className="blog-list">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title
          // const path = node.frontmatter.path
          const excerpt = node.excerpt
          const date = node.frontmatter.date
          // const path = node.frontmatter.path
          const slug = node.fields.slug

          return (
            <Link className="blog-item-link" to={slug}>
              <RoundedContainer className="blog-item">
                <article key={slug}>
                  <h2 itemProp="name">{title}</h2>
                  <time itemProp="datePublished">{date}</time>
                  <p className="except-container" itemProp="description">
                    {excerpt}
                  </p>
                </article>
              </RoundedContainer>
            </Link>
          )
        })}
      </OuterContainer>

      <div className="pagination">
        {previousPage && previousPage !== 1
          ? (
            <Link to={`/blogs/${previousPage}`}>上一頁</Link>
          )
          : previousPage && <Link to="/blogs/">上一頁</Link>
        }
        {nextPage && <Link to={`/blogs/${nextPage}`} style={{ float: "right" }}>下一頁</Link>}
      </div>
    </Layout>
  )
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
            excerpt
            frontmatter {
              title
              date(formatString: "YYYY-MM-DD")
              path
            }
          }
        }
    }
  }
`

export default HomePage
