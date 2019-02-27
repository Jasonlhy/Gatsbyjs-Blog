import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from "../components/layout"

const HomePage = ({ data }) => {
    console.log("data: ", data);
    let posts = data.allMarkdownRemark.edges;
    
    return (
        <Layout>
            {posts.map(({ node }) => {
                const title = node.frontmatter.title
                const path = node.frontmatter.path
                return (
                    <div>
                        <h2>{title}</h2>
                        <Link to={path}>Read</Link>
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
            frontmatter {
              title
              path
            }
          }
        }
    }
  }
`

export default HomePage