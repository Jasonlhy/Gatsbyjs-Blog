import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import BlogListLink from "../components/blogListLink"
import TagCloud from "../components/tagCloud"

import { Container } from "../components/containers"

const IndexPage = () => (
  <Layout>
    <SEO title="Left For J" keywords={[`gatsby`, `application`, `react`]} />
    <TagCloud />
    <Container>
      <strong>資料還在整理中</strong><br/>
      <BlogListLink pagenumber={1}>文章列表</BlogListLink>
    </Container>

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
