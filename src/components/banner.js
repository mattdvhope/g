import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { isLoggedIn } from "../utils/auth"
// import { linkVisit } from "../utils/railsVisits"
import { FacebookBrowser, LineBrowser } from "../utils/BrowserTypes"
import LineIcon from "../images/LINE_APP.png"
import FacebookIcon from "../images/FacebookIcon.jpg"

export default class Banner extends Component {

  constructor(props) {
    super();
    this.state = { 
      window: undefined,
      linkColor: { color: `#DAC899` },
      GatsbyLinkClicked: false,
    };
  }

  componentDidMount() {
    this.setState({ window: window })
  }

  GatsbyLink() {
    return (
      <a 
        href={`walk-water`}
        style={this.state.linkColor}
        onClick='FB.AppEvents.logEvent("GatsbyLinkClicked")'
      >
        {this.props.socialLinkStatement}
      </a>
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
                </span>
                <span style={{
                  fontSize: `${window.screen.width > 600 ? 4 : 7.5}vw`,
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  width: `70%`,
                }}>
                  {this.GatsbyLink()}
                </span>
                <br/>
              </div>
            </div>
          </div>
        );
    } else {
      return <span/>
    }
  }
}
