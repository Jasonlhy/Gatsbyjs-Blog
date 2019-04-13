import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { OuterContainer, ShadowContainer } from "../components/containers"
import BlogListLink from "../components/blogListLink"

import "./blogs.css"

const HomePage = ({ data, pageContext }) => {
  const currentPage = pageContext.currentPage
  const numPages = pageContext.numPages
  const posts = data.allMarkdownRemark.edges

  // Pagination
  // blogs/1 is not generated
  const previousPage = (currentPage === 1) ? undefined : (currentPage - 1)
  const nextPage = (currentPage === numPages) ? undefined : (currentPage + 1)

  return (
    <Layout>
      <SEO title="文章列表" keywords={[`programming`, `blog`, `life`]} />
      <h1 class="page-title">文章列表 - 頁 {currentPage}</h1>
      <OuterContainer className="blog-list">
        {posts.map(({ node }) => {
          const { title, date } = node.frontmatter
          const excerpt = node.excerpt
          const slug = node.fields.slug

          return (
            <Link className="blog-item-link"
              to={slug}
              state={{
                fromBlogs: true,
                pageNumber: currentPage
              }}>

              <ShadowContainer className="blog-item">
                <article key={slug}>
                  <div className="blog-item-info"
                    style={{
                      marginBottom: "1.0875rem"
                    }}
                  >
                    <h2 itemProp="name">{title}</h2>
                    <time itemProp="datePublished">{date}</time>
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
        { previousPage && <BlogListLink pageNumber={previousPage}>上一頁</BlogListLink> }
        { nextPage && <BlogListLink pageNumber={nextPage} style={{ float: "right" }}>下一頁</BlogListLink> }
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
            excerpt(format: HTML, pruneLength:150)
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
