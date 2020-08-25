import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import YoutubeHolder from "../components/YoutubeHolder"
import FacebookPageBox from "../components/FacebookPageBox"

const BlogPost = () => (
  <StaticQuery
    query={detailsQuery}
    render={dataFromGraphQl => {
      const data = dataFromGraphQl.contentfulBlogs
      const siteurl = dataFromGraphQl.contentfulHomePage.siteUrl + "/";
      const socialConfigss = {
        site: {
          siteMetadata: { siteurl }
        },
        title: data.title,
        slug: data.slug
      };

      return (
        <Layout>
          <SEO
            title={data.title}
            keywords={[
              `สายสัมพันธ์ ความสุข`,
              `Frontend Developer`,
              `Developer`,
              `${data.title}`
            ]}
          />
          <div className="site-container blog-post">
            <div className="container">
              <YoutubeHolder/>
              <FacebookPageBox/>
              <br/>
              <hr/>
              <Share
                socialConfig={{
                  config: {
                    url: `${siteurl}${socialConfigss.slug}`,
                    title: `${socialConfigss.title}`
                  }
                }}
              />
            </div>
          </div>
        </Layout>
      );
    }}
  />
)

export default BlogPost

const detailsQuery = graphql`
  query BlogPostPageQuery {
    contentfulBlogs {
      title
      slug
    }
    contentfulHomePage {
      siteUrl
    }
  }
`;

