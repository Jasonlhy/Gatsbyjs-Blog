import React from "react"
import { StaticQuery, graphql } from "gatsby"
import TagLabel from "./tagLabel"

import styles from "./tagCloud.module.css"

const TagCloud = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => {
      const { group } = data.allMarkdownRemark
      return (
        <div className={styles.container}>
          <h1>標籤雲</h1>
          {group.map(g => {
            return (
              <div className={styles.labelContainer}>
                <TagLabel tag={g.fieldValue} isClickable={true} count={g.totalCount} />
              </div>
            )
          })}
        </div>
      )
    }
    }
  />
)

export default TagCloud
