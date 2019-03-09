import React from "react"
import Search from "../components/SearchContainer"
import Layout from "../components/layout"
import SEO from "../templates/blogs"

const SearchPage = () => (
  <Layout>
    <SEO title="搜尋文章" keywords={[`blog`, `programming`, `life`]} />
    <Search />
  </Layout>
)

export default SearchPage
