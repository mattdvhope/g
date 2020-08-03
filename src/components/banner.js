import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { isLoggedIn } from "../utils/auth"
// import { linkVisit } from "../utils/railsVisits"
import { lineLoginURL } from "../utils/linePlatform"
import { fbLoginURL } from "../utils/FBplatform"
import { FacebookBrowser, LineBrowser } from "../utils/BrowserTypes"
import LineIcon from "../images/LINE_APP.png"
import FacebookIcon from "../images/FacebookIcon.jpg"

export default class Banner extends Component {

  constructor(props) {
    super();
    this.state = { 
      window: undefined,
      linkColor: { color: `#DAC899` },
      is_FB_browser: false,
      is_LINE_browser: false,
      GatsbyLinkClicked: false,
    };
  }

  componentDidMount() {
    this.setState({ is_FB_browser: FacebookBrowser(), is_LINE_browser: LineBrowser(), window: window })
  }

  GatsbyLink() {
    return (
      <a 
        href={`survey-1`}
        style={this.state.linkColor}
      >
        {this.props.socialLinkStatement}
      </a>
    )
  }

  lineIcon() {
    return (
      <li>
        <a
          className="fab fa-line"
          href={`https://line.me/R/ti/p/%40000ombos`}
          style={{ fontSize: `200%` }}
          rel="noopener noreferrer"
        ></a>
      </li>
    )
  }

  fbIcon() {
    return (
      <li>
        <a
          className="fab fa-facebook-f"
          href={`https://www.facebook.com/pg/relationshipsthailand/`}
          style={{ fontSize: `140%` }}
          rel="noopener noreferrer"
        ></a>
      </li>
    )
  }

  render() {
    const { data } = this.props;

    if (this.state.window) {
    
        return (
          <div className="banner">
            <Img
              fluid={data.bannerImage.fluid}
              objectFit="cover"
              objectPosition="50% 50%"
            />
            <div className="container">
              <div className="banner-details">
                <span style={{ fontSize: `${window.screen.width > 600 ? 8 : 10}vw` }}>
                  {data.name}
                </span> {/* <h1>I'm {data.designation}.</h1> */} 
                <span style={{
                  fontSize: `${window.screen.width > 600 ? 4 : 7.5}vw`,
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  width: `70%`,
                }}>
                  {this.GatsbyLink()}
                </span>
                <br/>
                <ul className="social">
                  {this.lineIcon()}
                  {this.fbIcon()}
                </ul>
              </div>
            </div>
          </div>
        );
    } else {
      return <span/>
    }
  }
}
