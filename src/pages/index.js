import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Banner from "../components/banner";
import About from "../components/about";
import Service from "../components/service";
import Work from "../components/work";
import Surveys from "../components/surveys";
import Blogs from "../components/blogs";
import Testimonial from "../components/testimonial";
import Contact from "../components/contact";
import Photos from "../components/photos";

const IndexPage = ({ data }) => {
  return (
    <Layout header="home">
      <SEO
        title={data.contentfulAboutMe.designation}
        keywords={[`ความเชื่อ`, `ความหวัง`, `ความรัก`]}
      />
      <Banner data={data.contentfulAboutMe} socialLinkStatement={data.contentfulHomePage.socialLinkStatement} ></Banner>

      {data.contentfulHomePage.menus
        .filter(item => item === "About")
        .map(t => {
          return <About data={data.contentfulAboutMe} key={t}></About>;
        })}

      {data.contentfulHomePage.menus
        .filter(item => item === "Service")
        .map(t => {
          return <Service data={data.allContentfulService} key={t}></Service>;
        })}

      {data.contentfulHomePage.menus
        .filter(item => item === "Surveys")
        .map(t => {
          return <Surveys data={data.allContentfulSurveys} key={t}></Surveys>;
        })}

      {data.contentfulHomePage.menus
        .filter(item => item === "Blogs")
        .map(t => {
          return <Blogs data={data.allContentfulBlogs} key={t}></Blogs>;
        })}

      {data.contentfulHomePage.menus
        .filter(item => item === "Work")
        .map(t => {
          return <Work data={data.allContentfulWorks} key={t}></Work>;
        })}

      {data.contentfulHomePage.menus
        .filter(item => item === "Testimonials")
        .map(t => {
          return (
            <Testimonial data={data.allContentfulTestimonials} key={t}></Testimonial>
          );
        })}

      {data.contentfulHomePage.menus
        .filter(item => item === "Photos")
        .map(t => {
          return <Photos data={data.contentfulPhotos} key={t}></Photos>;
        })}

      {data.contentfulHomePage.menus
        .filter(item => item === "Contact")
        .map(t => {
          return <Contact data={data.contentfulAboutMe.gmail} key={t}></Contact>;
        })}
    </Layout>
  )
}


export default IndexPage;

export const pageQuery = graphql`
  query AboutQuery {
    contentfulAboutMe {
      name
      photo {
        file {
          url
        }
        fluid {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      designation
      age
      facebook
      github
      gmail
      id
      instagram
      linkdin
      twitter
      line
      location
      description {
        childMarkdownRemark {
          html
        }
      }
      bannerImage {
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
      bannerList
    }
    allContentfulService {
      edges {
        node {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulSurveys(limit: 2, sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          title
          slug
          image {
            fluid(maxWidth: 600) {
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
            description
          }
          questions {
            question
            questionChoices {
              choice
            }
          }
          createdAt
        }
      }
    }
    allContentfulBlogs(limit: 5, sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          title
          slug
          featureImage {
            fluid(maxWidth: 600) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
          createdAt
        }
      }
    }
    allContentfulTestimonials {
      edges {
        node {
          name
          subTitle
          description {
            childMarkdownRemark {
              html
            }
          }
          avatarImage {
            fluid(maxWidth: 200) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
    allContentfulWorks {
      edges {
        node {
          siteName
          url
          image {
            fluid(maxWidth: 600) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
    contentfulPhotos {
      photos {
        fluid(maxWidth: 600) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
    contentfulHomePage {
      siteName
      socialLinkStatement
      menus
    }
  }
`;
