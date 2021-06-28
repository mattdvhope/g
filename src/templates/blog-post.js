import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
// import Share from "../components/share";
import YoutubeHolder from "./YoutubeHolder"
import YoutubeHolderPrompts from "./YoutubeHolderPrompts"
// import FacebookPageBox from "../components/FacebookPageBox"

export default class blogPost extends Component {

  constructor(props) {
    super();
    this.state = { 
      data: props.data.contentfulBlogs,
    };
  }

  YT(data) {
    if (data.promptsForResponse) {
      return (<YoutubeHolderPrompts data={data} />)
    } else {
      return (<YoutubeHolder data={data} />)
    }
  }

  render() {
    const data = this.state.data;
    const siteurl = this.props.data.contentfulHomePage.siteUrl + "/";
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
          videoCover={data.featureImage.fluid.src}
          keywords={[
            `สายสัมพันธ์ ความสุข`,
            `Frontend Developer`,
            `Developer`,
            `${data.title}`
          ]}
        />
        <div className="site-container blog-post">
          <div className="container">
            {this.YT(data)}
            <hr/>
            <div style={{ margin: `auto`, width: `90%` }} >
              <Link
                to="/videos"
                style={{ color: `#8f7228`, fontSize: `170%` }}
              >📽️ ดูวิดีโอเพิ่มเติม 📺</Link>
            </div>
            <hr/>
        {/* <hr/>
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
            />  */}
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostQuery($slug: String!) {
    contentfulBlogs(slug: {eq: $slug}) {
      id
      slug
      title
      ctaFirst
      youtubeUrl
      description {
        childMarkdownRemark {
          html
        }
      }
      featureImage {
        fluid {
          src
        }
      }
      promptsForResponse {
        promptSlug
        promptContent {
          childMarkdownRemark {
            html
          }
        }
        buttonInvitation
      }
    }
    contentfulHomePage {
      siteUrl
    }
  }
`;
