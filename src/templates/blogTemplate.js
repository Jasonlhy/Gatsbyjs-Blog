import React from "react"
import { graphql } from "gatsby"

import BlogLayout from "../components/blogLayout"
import SEO from "../components/seo"
import "./blogTemplate.css"

import RoundedContainer from "../components/containers/rounedContainer"
import OuterContainer from "../components/containers/outerContainer"
import TableOfContent from "./tableOfContent"

// Blog Template
export default function Template ({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, tableOfContents } = markdownRemark

  // Layout Contnent
  const toc = <TableOfContent toc={tableOfContents} />

  const header = (
    <>
      <SEO title={frontmatter.title} keywords={[`programming`, `blog`, `life`]} />
      <section className="blog-heading">
        <h1 className="small-margin-bottom page-title">{frontmatter.title}</h1>
        <time style={{ display: "block" }}>{frontmatter.date}</time>
      </section>
    </>
  )
  const article = (
    <div className="blog-post-content-container">
      <OuterContainer>
        <RoundedContainer>
          <article className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </RoundedContainer>
      </OuterContainer>
    </div>
  )

  return (
    <BlogLayout
      header={header}
      left={article}
      right={toc} />
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
