import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ReferencePage = function ({ location }) {
  return (
    <Layout>
      <SEO title="Left For J" keywords={[`gatsby`, `application`, `react`]} />
      <div>
        <ol>
          <li>
            <a href="https://google.github.io/styleguide">Google Style Guide</a>
          </li>
          <li>
            <a href="https://tachingchen.com/tw/blog/how-to-do-a-code-review-by-google-1/?fbclid=IwAR0I0V0LJKZBjmDXj-tXVz_jkwyHX_zUvy1IN592zdkSkIBBTKm2K1LG9UM">
              Google 如何進行 Code Review - 1
            </a>
          </li>
        </ol>
      </div>
    </Layout>
  )
}

export default ReferencePage
