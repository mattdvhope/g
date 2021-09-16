import React from "react";
import { detect } from "detect-browser";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Privacy = ({ data }) => {

  const browser = detect();

  return (
    <Layout header="privacy">
      <SEO
        title={data.allContentfulPrivacyPage.designation}
        keywords={[`ความเชื่อ`, `ความหวัง`, `ความรัก`]}
      />

      <div className="site-container blogs-page" id="Blogs">
        <div className="container">
          <div
            className="section-head"
            dangerouslySetInnerHTML={{
              __html: data.allContentfulPrivacyPage.edges[0].node.mainText.childMarkdownRemark.html
            }}
          />
        </div>
      </div>
      <h2>{JSON.stringify(browser)}</h2>
    </Layout>
  )
}

export default Privacy;

export const pageQuery = graphql`
  query PrivacyQuery {
    contentfulAboutMe {
      designation
    }
    allContentfulPrivacyPage {
      edges {
        node {
          mainText {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
