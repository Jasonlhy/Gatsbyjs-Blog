import React, { useEffect, useState } from "react"
import Axios from "axios"
import Img from "react-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { List as ListLoader } from "react-content-loader"

const IndexPage = function({ location }) {
  const [dogImageUrl, setDogImageUrl] = useState("")

  const fetechDogImage = async () => {
    const result = await Axios("https://dog.ceo/api/breeds/image/random")
    const { message } = result.data
    // console.log(result)
    setDogImageUrl(message)
  }

  // why hv location?: https://stackoverflow.com/questions/56120929/gatsby-context-update-causes-infinite-render-loop
  useEffect(
    function() {
      fetechDogImage()
    },
    [location]
  )

  return (
    <Layout>
      <SEO title="Life For J" keywords={[`gatsby`, `application`, `react`]} />
      <p>
        Powered by <a href="https://dog.ceo/dog-api/">Dog API</a>
      </p>
      <div style={{ maxWidth: "100%", marginBottom: `1.45rem` }}>
        {dogImageUrl ? (
          <Img src={dogImageUrl} loader={<ListLoader />} />
        ) : (
          <ListLoader />
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
