import React from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogItem from "../components/blogItem"
import { OuterContainer } from "../components/containers"

// Stateless JSX component with props of data injected by graphQL
export default function TagPage ({ pageContext, data, location }) {
  const { tag } = pageContext
  const { group } = data.allMarkdownRemark
  const tagField = group.filter(g => g.fieldValue === tag)[0]
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

  // <h1 className="page-title" style={{
  // marginBottom: "5px"
  // }}><TagLabel tag={tag} /></h1>
  return (
    <Layout>
      <SEO title="Tags" keywords={[tag]}></SEO>
      <h1 className="page-title" style={{
        marginBottom: "5px"
      }}>{tag}</h1>
      <p><strong>標籤總數</strong>: {tagField.totalCount}</p>

      <OuterContainer className="blog-list">
        {posts.map(({ node }) => {
          const { title, date, tags } = node.frontmatter
          const excerpt = node.excerpt
          const slug = node.fields.slug
          const isFocus = (focusSlug === slug)

          return (
            <BlogItem
              key={slug}
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
