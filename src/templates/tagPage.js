import React from "react"
import { graphql, Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogItem from "../components/blogItem"
import TagList from "../components/tagList"
import { OuterContainer, ShadowContainer } from "../components/containers"

// Stateless JSX component with props of data injected by graphQL
export default function TagPage ({ pageContext, data, location }) {
  const { tag } = pageContext
  const { group } = data
  const posts = data.allMarkdownRemark.edges
  const focusSlug = location && location.state && location.state.slug

  return (
    <Layout>
      <SEO title="Tags" keywords={[]}></SEO>
      <h1 className="page-title">Tag - {tag}</h1>

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
              navigateHandler={null}
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
