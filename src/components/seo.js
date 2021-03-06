import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, keywords, title, videoCover, data }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const image = videoCover || `https://relate.s3-ap-southeast-1.amazonaws.com/sheep-flock-mountain-512x512.jpg`;
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={`${data.contentfulHomePage.siteName}`}
            meta={[
              {
                name: `description`,
                content: data.contentfulHomePage.siteDescription
              },
              {
                property: `og:title`,
                content: title
              },
              {
                property: `og:description`,
                content: data.contentfulHomePage.siteDescription
              },
              {
                property: `og:image`,
                content: image
              },
              {
                property: `og:url`,
                content: data.contentfulHomePage.siteUrl
              },
              {
                property: `og:type`,
                content: `website`
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `)
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `th`,
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    contentfulHomePage {
      siteName
      siteUrl
      siteDescription
    }
  }
`;
