import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { isLoggedIn } from "../utils/auth"
// import { linkVisit } from "../utils/railsVisits"

export default class Banner extends Component {

  constructor(props) {
    super();
    this.state = { 
      window: undefined,
    };
  }

  lineIcon() {
    return (
      <li>
        <a
          className="fab fa-line"
          href="#"
          style={{ fontSize: `200%` }}
          rel="line app"
        ></a>
      </li>
    )
  }

  fbIcon() {
    return (
      <li>
        <a
          className="fab fa-facebook-f"
          href="#"
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
                  <Link to="survey-1" style={{ color: `#DAC899` }}>Cat page</Link>
                </span>
                <br/>
                <ul className="social">
                  {lineIcon()}
                  {fbIcon()}
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
