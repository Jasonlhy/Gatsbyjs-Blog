import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import BlogListLink from "../components/blogListLink"

const IndexPage = () => (
  <Layout>
    <SEO title="Left For J" keywords={[`gatsby`, `application`, `react`]} />
    <h1>資料還在整理中 ... </h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <BlogListLink pageNumber={1}>文章列表</BlogListLink>
  </Layout>
)

export default IndexPage
