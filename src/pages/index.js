import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="IT JJ 的日常" keywords={[`gatsby`, `application`, `react`]} />
    <h1>資料還在整理中 ... </h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/blogs">文章列表</Link>
  </Layout>
)

export default IndexPage
