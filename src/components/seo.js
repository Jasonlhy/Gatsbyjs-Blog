/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, keywords, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    // JSX Fragment
    <>
      <Helmet>
        <link rel="stylesheet" href="https://use.typekit.net/ire8mgb.css" />

        <script>
          {`
            (function(d) {
              var config = {
                  kitId: 'xfm1vqy',
                  scriptTimeout: 3000,
                  async: true
                },
                h = d.documentElement, t = setTimeout(function() {
                  h.className = h.className.replace(/\\bwf-loading\\b/g, "") + " wf-inactive";
                }, config.scriptTimeout), tk = d.createElement("script"), f = false,
                s = d.getElementsByTagName("script")[0], a;
              h.className += " wf-loading";
              tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
              tk.async = true;
              tk.onload = tk.onreadystatechange = function() {
                a = this.readyState;
                if (f || a && a != "complete" && a != "loaded") return;
                f = true;
                clearTimeout(t);
                try {
                  Typekit.load(config)
                } catch (e) {
                }
              };
              s.parentNode.insertBefore(tk, s)
            })(document);`}
        </script>
      </Helmet>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
        ]
          .concat(
            keywords.length > 0
              ? {
                  name: `keywords`,
                  content: keywords.join(`, `),
                }
              : []
          )
          .concat(meta)}
      />
    </>
  )
}

SEO.defaultProps = {
  lang: `zh-Hant`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
