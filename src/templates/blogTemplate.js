import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import './blogTemplate.css'

// Blog Template
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  // const { frontmatter, html, tableOfContents } = markdownRemark
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          {/* TODO: no idea why HTML don't have the URL in TOC */}
          {/* <div className="blog-toc"
            dangerouslySetInnerHTML={{ __html: tableOfContents }} /> */}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
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