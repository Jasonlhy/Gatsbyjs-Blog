import React from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogItem from "../components/blogItem"
import { OuterContainer } from "../components/containers"

// Stateless JSX component with props of data injected by graphQL
export default function TagPage ({ pageContext, data, location }) {
  const { tag } = pageContext
  const { group } = data
  const posts = data.allMarkdownRemark.edges
  const focusSlug = location && location.state && location.state.slug

  // TODO: Copy first, use Hook?
  const navigateToArticle = event => {
    event.preventDefault()

    const anchorElement = event.currentTarget
    const slug = anchorElement.dataset.slug // href will be resolved in full URL

    navigate(
      slug,
      {
        state: {
          fromBlogs: false
        }
      }
    )
  }

  return (
    <Layout>
      <SEO title="Tags" keywords={[]}></SEO>
      <h1 className="page-title">{<span style={{
        paddingLeft: "5px",
        paddingRight: "5px",
        backgroundColor: "#757de8",
        marginRight: "5px",
        color: "white"
      }}>{tag}</span>} 的文章</h1>

      <OuterContainer className="blog-list">
        {posts.map(({ node }) => {
          const { title, date, tags } = node.frontmatter
          const excerpt = node.excerpt
          const slug = node.fields.slug
          const isFocus = (focusSlug === slug)

          return (
            <BlogItem
              slug={slug}
              excerpt={excerpt}
              date={date}
              tags={tags}
              title={title}
              navigateHandler={navigateToArticle}
              isFocus={isFocus}
            />
          )
        })}
      </OuterContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      filter: {
        frontmatter: {
          tags: {
            in: [$tag]
          }
        }
      }
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
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
    }
  }
`
