/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const _ = require("lodash")

function createBlogPages(graphql, createPage){
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
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

    // Create blog list page
    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)
    const blogListTemplate = path.resolve("./src/templates/blogs.js") 
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blogs` : `/blogs/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages: numPages,
        },
      })
    })
  })
}

function createTagPages(graphql, createPage) {
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
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
    const posts = result.data.allMarkdownRemark.edges
    const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug
        },
      })
    })

    // Create blog tags page with kebabCase
    const tagTemplate = path.resolve("./src/templates/tagPage.js")

    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    tags = _.uniq(tags)

    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag: tag
        },
      })
    })
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  // May use alias instead of two promise?
  // https://spectrum.chat/gatsby-js/general/can-i-have-two-export-createpages-in-gatsby-node-js~1d166bc9-2273-4190-8ab1-253284a1a54d
  const createPagePromises = [createBlogPages(graphql, createPage), createTagPages(graphql, createPage)]
  return Promise.all(createPagePromises)
}

// slug is need for the table of content
// slug can be created from the file path
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
