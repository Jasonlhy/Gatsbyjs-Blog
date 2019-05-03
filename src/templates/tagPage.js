import React from "react"
import { graphql, Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
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
          const blogItemClass = (focusSlug === slug) ? "blog-item focus" : "blog-item"

          return (
            <Link className="blog-item-link"
              key={slug}
              to={slug}
              data-slug={slug}
              onClick={undefined}>

              <ShadowContainer className={blogItemClass}>
                <article key={slug}>
                  <div className="blog-item-info"
                    style={{
                      marginBottom: "1.0875rem"
                    }}
                  >
                    <h2 itemProp="name">{title}</h2>
                    <time itemProp="datePublished">{date}</time>
                    <TagList tags={tags} />
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
