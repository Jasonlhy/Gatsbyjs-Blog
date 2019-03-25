import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./blogTemplate.css"

// Blog Template
export default function Template ({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, tableOfContents } = markdownRemark

  const toc = <div className="blog-toc"
    dangerouslySetInnerHTML={{ __html: tableOfContents }} />
  const article = (
    <>
      <SEO title={frontmatter.title} keywords={[`programming`, `blog`, `life`]} />
      <div className="blog-post-container">
        <div className="blog-post">
          <section className="blog-heading">
            <h1 className="small-margin-bottom page-title">{frontmatter.title}</h1>
            <time style={{ display: "block" }}>{frontmatter.date}</time>
          </section>

          <article className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </>
  )

  return (
    <Layout
      children={article}
      children2={toc} />
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      tableOfContents
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
      }
    }
  }
`
