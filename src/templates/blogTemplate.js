import React from "react"
import { graphql } from "gatsby"

import BlogLayout from "../components/blogLayout"
import SEO from "../components/seo"
import TagList from "../components/tagList"
import "./blogTemplate.css"
import BlogListLink from "../components/blogListLink"

import {
  Container,
  OuterContainer,
  ShadowContainer
} from "../components/containers"
import TableOfContent from "./tableOfContent"

// Blog Template
export default function Template ({
  location, // this prop will be injected by router
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, tableOfContents, fields } = markdownRemark
  const { slug } = fields

  // Back page information from blog list
  let fromBlogs, pagenumber
  if (location && location.state) {
    fromBlogs = location.state.fromBlogs
    pagenumber = location.state.pagenumber
  }

  // Layout Contnent
  const toc = <TableOfContent toc={tableOfContents} />

  const header = (
    <>
      <SEO title={frontmatter.title} keywords={frontmatter.tags || []} />
    </>
  )
  const article = (
    <div className="blog-post-content-container">
      <OuterContainer>
        <ShadowContainer>
          <OuterContainer>
            <Container className="blog-heading-container">
              <section className="blog-heading">
                <h1 className="page-title" style={{
                  marginBottom: 0
                }}>{frontmatter.title}</h1>
              <TagList tags={frontmatter.tags} />
              <div style={{ fontSize: "80%" }}>
                <time style={{ marginRight: "1rem" }}>建立: {frontmatter.date}</time>
                {frontmatter.update && <time>更新: {frontmatter.update}</time>}
              </div>

              {fromBlogs && (
                <BlogListLink
                  pagenumber={pagenumber}
                  state={{
                    pageX: location.state.pageX,
                    pageY: location.state.pageY,
                    slug: slug,
                  }}>返回文章列表
                </BlogListLink>
              )}
            </section>
          </Container>
        </OuterContainer>
        <article className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ShadowContainer>
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
        update(formatString: "YYYY-MM-DD")
        path
        title
        tags
      }
    }
  }
`
