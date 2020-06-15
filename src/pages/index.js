import React from "react";
import { graphql } from "gatsby";

import Helmet from "react-helmet";
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

const IndexPage = ({ data }) => (
  <Layout header="home">
    <Helmet title={data.contentfulSiteInformation.siteName}>
      <meta property="og:title" content={data.contentfulSiteInformation.siteName} />
      <meta property="og:description" content="เราอยู่ที่นี่เพื่อช่วยให้ผู้คนเติบโตขึ้นในความสัมพันธ์ที่ดีต่อสุขภาพ" />
      <meta property="og:image" content="https://relate.s3-ap-southeast-1.amazonaws.com/sheep-flock-mountain.gif" />
      <meta property="og:url" content="https://www.สายสัมพันธ์.com/"/>
    </Helmet>
    <SEO
      title={data.contentfulAboutMe.designation}
      keywords={[`Rohit Gupta`, `Frontend Developer`, `Developer`]}
    />
    <Banner data={data.contentfulAboutMe}></Banner>

    {data.contentfulSiteInformation.menus
      .filter(item => item === "About")
      .map(t => {
        return <About data={data.contentfulAboutMe}></About>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Service")
      .map(t => {
        return <Service data={data.allContentfulService}></Service>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Surveys")
      .map(t => {
        return <Surveys data={data.allContentfulSurveys}></Surveys>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Blogs")
      .map(t => {
        return <Blogs data={data.allContentfulBlogs}></Blogs>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Work")
      .map(t => {
        return <Work data={data.allContentfulWorks}></Work>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Testimonials")
      .map(t => {
        return (
          <Testimonial data={data.allContentfulTestimonials}></Testimonial>
        );
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Photos")
      .map(t => {
        return <Photos data={data.contentfulPhotos}></Photos>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Contact")
      .map(t => {
        return <Contact data={data.contentfulAboutMe.gmail}></Contact>;
      })}
  </Layout>
);

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
    contentfulSiteInformation {
      siteName
      menus
    }
  }
`;
