import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from "../components/layout"
import "./blogs.css"

const HomePage = ({ data, pageContext }) => {
    // For pagination
    console.log("pageContext ", pageContext);
    const currentPage = pageContext.currentPage;
    const numPages = pageContext.numPages
    const previousPage = (currentPage === 1) ? undefined : (currentPage - 1);
    const nextPage = (currentPage === numPages) ? undefined : (currentPage + 1); // blogs/1 is not generated
    
    let posts = data.allMarkdownRemark.edges;

    return (
        <Layout>
            <div className="blog-list">
              {posts.map(({ node }) => {
                  const title = node.frontmatter.title
                  // const path = node.frontmatter.path
                  const excerpt = node.excerpt
                  const date = node.frontmatter.date
                  // const path = node.frontmatter.path
                  const slug = node.fields.slug

                  return (
                      <div className="blog-item" key={slug}>
                          <h2>{title}</h2>
                          <time>{date}</time>
                          <div className="except-container">
                            {excerpt}
                          </div>
                          <Link to={slug}>閱讀更多</Link>
                      </div>
                  )
              })}
            </div>

            <div className="pagination">
              {previousPage && previousPage !== 1 ?
                (
                  <Link to={`/blogs/${previousPage}`}>上一頁</Link>
                )
                : previousPage && <Link to="/blogs/">上一頁</Link>
              }
              {nextPage && <Link to={`/blogs/${nextPage}`} style={{float: 'right' }}>下一頁</Link>}
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