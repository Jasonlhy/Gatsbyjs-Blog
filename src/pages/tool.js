import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ToolPage = () => {
  return (
    <Layout>
      <SEO title="工具" keywords={[`gatsby`, `application`, `react`]} />
      <h1>工具</h1>
      <ul>
        <li><a href="https://www.figma.com/files">Figma</a></li>
      </ul>
      <Link to="/blogs">文章列表</Link>
    </Layout>
  )
}

export default ToolPage
