import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";
import Layout from "./layout";
import SEO from "./seo";
import Share from "./share";
import YoutubeHolder from "./YoutubeHolder"
import FacebookPageBox from "./FacebookPageBox"

const BlogPostPage = () => (
  <StaticQuery
    query={detailsQuery}
    render={dataFromGraphQl => {
			const data = dataFromGraphQl.contentfulBlogs
	    const siteurl = dataFromGraphQl.contentfulSiteInformation.siteUrl + "/";
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
	                ...socialConfigss.site.siteMetadata.twiteerhandletitle,
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

export default BlogPostPage

const detailsQuery = graphql`
  query BlogPostPageQuery {
    contentfulBlogs {
      id
      title
      slug
      featureImage {
        fluid(maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
    }
  }
`;

