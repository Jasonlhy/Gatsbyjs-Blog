import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from "../components/layout"
import "./blogs.css"

const HomePage = ({ data }) => {
    console.log("data: ", data);
    let posts = data.allMarkdownRemark.edges;
    
    return (
        <Layout>
            {posts.map(({ node }) => {
                const title = node.frontmatter.title
                // const path = node.frontmatter.path
                const excerpt = node.excerpt
                const date = node.frontmatter.date
                // const path = node.frontmatter.path
                const slug = node.fields.slug

                return (
                    <div className="blog-item">
                        <h2>{title}</h2>
                        <time>{date}</time>
                        <div className="except-container">
                          {excerpt}
                        </div>
                        <Link to={slug}>閱讀更多</Link>
                    </div>
                )
            })}
        </Layout>
    )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000) {
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