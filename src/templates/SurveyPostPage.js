import React from "react"
import Img from "gatsby-image";
import moment from "moment";
import 'moment/locale/th';
import Layout from "../components/layout";
import SEO from "../components/seo";
import Helmet from "react-helmet";
import Share from "../components/share";
import Form from "../components/form";
import { rubyQuestions } from "../utils/rubyStyleObjs"

const SurveyPostPage = ({ data, siteurl, socialConfigss }) => (
	<Layout>
    <Helmet>
      <div id="fb-root"></div>
      <script async defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=611958516129057&autoLogAppEvents=1"
        nonce="PFVZXkQp"
      />
    </Helmet>
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
        {data.image ? (
          <Img
            className="feature-img"
            fluid={data.image.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
          />
        ) : (
          <div className="no-image"></div>
        )}

        <div className="details">
          <h1 className="title">{data.title}</h1>
          <span className="date" style={{ height: `1px` }}>
            <i className="fas fa-calendar-alt"></i>{" "}
            {moment("2020-07-22T15:00:15.921Z").format("LL")}
          </span>
          <div
            dangerouslySetInnerHTML={{
              __html: data.description.childMarkdownRemark.html
            }}
          />
          
          <div
            className="fb-like"
            data-href="https://relationshipsthailand.org/survey-1"
            data-width="300"
            data-layout="standard"
            data-action="like"
            data-size="large"
            data-share="true"
          />
          <br/>
        </div>
        <Form
          survey_id={data.id}
          title={data.title}
          questions={rubyQuestions(data.questions)}
          thankYouNote={data.thankYouNote}
          furtherCta={data.furtherCta}
          belowCta={data.belowCta}
        />
        <br/>
        <div
          className="fb-like"
          data-href="https://relationshipsthailand.org/survey-1"
          data-width="300"
          data-layout="standard"
          data-action="like"
          data-size="large"
          data-share="true"
        />
        <br/>
        <br/>
        <div className="fb-comments" data-href="https://relationshipsthailand.org/survey-1" data-numposts="2" data-width=""></div>
        <br/>
        <br/>
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
)

export default SurveyPostPage
