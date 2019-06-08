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
          <h3 className={styles.heading}>標籤雲</h3>
          {group.map(g => {
            const { fieldValue: tagLabel, totalCount: tagCount } = g

            return (
              <div key={tagLabel} className={styles.labelContainer}>
                <TagLabel tag={tagLabel} isClickable={true} count={tagCount} />
              </div>
            )
          })}
        </div>
      )
    }}
  />
)

export default TagCloud
