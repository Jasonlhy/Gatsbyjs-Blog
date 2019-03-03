/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  
  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              categories
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    // Create page of each markdown page
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let path = node.frontmatter.path || ("/blog/" + node.frontmatter.categories + "/" + node.frontmatter.title)
      console.log("Page path: ", path)

      createPage({
        path: path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })

    // Create blog list page
    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blogs` : `/blogs/${i + 1}`,
        component: path.resolve("./src/templates/blogs.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  console.log("node.internal.type", node.internal.type)

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}