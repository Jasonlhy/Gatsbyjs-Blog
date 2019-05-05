import React from "react"

function Footer () {
  return (
    <footer style={{
      textAlign: "center"
    }}>
      <div>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
      <div>
        Hosted on <a href="https://aws.amazon.com/amplify/console">Amplify</a>
      </div>
      </footer>
  )
}

export default Footer
