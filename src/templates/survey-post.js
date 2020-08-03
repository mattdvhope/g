import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import SurveyPostPage from "./SurveyPostPage"
import { isLoggedIn, getUser, handleLogin } from "../utils/auth"
import { getAccessToken, getAppAccessToken, inspectAccessToken, getUserProfile } from "../utils/FBLoginValidations"
import { getIdToken, getPerson, validateIdToken, checkValidation } from "../utils/lineLoginValidations"
import { fbLoginURL } from "../utils/FBplatform"
import { lineLoginURL } from "../utils/linePlatform"
import { persistFbUser, persistLineUser } from "../utils/railsVisits"

export default class surveyPost extends Component {
  constructor(props) {
    super();
    this.state = { 
      profile: undefined,
    };
  }

  render() {
    const data = this.props.data.contentfulSurveys;
    const disqusShortname = "สายสัมพันธ์";
    const disqusConfig = {
      identifier: data.id,
      title: data.title
    };

    const siteurl = this.props.data.contentfulSiteInformation.siteUrl + "/";
    const socialConfigss = {
      site: {
        siteMetadata: { siteurl }
      },
      title: data.title,
      slug: data.slug
    };

    return (
      <SurveyPostPage
        data={data}
        siteurl={siteurl}
        socialConfigss={socialConfigss}
        profile={this.state.profile}
      />
    )

  } // render()
}

export const pageQuery = graphql`
  query SurveyPostQuery($slug: String!) {
    contentfulSurveys(slug: { eq: $slug }) {
      id
      title
      slug
      image {
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
      questions {
        id
        question
        questionChoices {
          id
          choice
        }
      }
      thankYouNote
      furtherCta
      belowCta
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
    }
  }
`;