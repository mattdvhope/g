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

  Linkage() {
    if (this.state.is_FB_browser) {
      return this.FbLink();
    }
    else if (this.state.is_LINE_browser) {
      return this.LineLink();
    } 
    else if (this.state.GatsbyLinkClicked) {
      return this.SocialLoginChoices();
    } 
    else {
      return this.GatsbyLink();
    } 
  }

  LineLink() {
    return (
      <a
        href={lineLoginURL()}
        onClick={e => localStorage.setItem("loginLink", "LineLink")}
        style={this.state.linkColor} 
        // onClick={e => linkVisit()}
      >
        {this.props.socialLinkStatement}
      </a>
    )
  }

  FbLink() {
    return (
      <a
        href={fbLoginURL()}
        style={this.state.linkColor} 
        // onClick={e => linkVisit()}
      >
        {this.props.socialLinkStatement}
      </a>
    )
  }

  GatsbyLink() {
    return (
      <a 
        href={`#`}
        onClick={e => this.setState({ GatsbyLinkClicked: true })}
        style={this.state.linkColor}
      >
        {this.props.socialLinkStatement}
      </a>
    )
  }

  SocialLoginChoices() {
    return (
      <div style={{ padding: `4%`, color: `#DAC899`, borderStyle: `ridge` }}>
        <h4>กรุณาเข้าสู่ระบบด้วยแอปพลิเคชันไลน์หรือเฟซบุ๊กเพื่อเข้าร่วมการสำรวจนี้นะค่ะ</h4>
        <a href={lineLoginURL()} onClick={e => localStorage.setItem("loginLink", "LineLink")}>
          <img src={LineIcon} style={{ width: `25%`, marginBottom: `7px` }} alt="LINE"/>
        </a>
         &nbsp;&nbsp;|&nbsp;&nbsp; 
        <a href={fbLoginURL()}>
          <img src={FacebookIcon} style={{ width: `25%`, marginBottom: `7px`, borderRadius: `100%` }} alt="FB"/>
        </a>
        <h4>หากคุณรู้สึกว่าคุณไม่ต้องการมีส่วนร่วมอีกต่อไปคุณสามารถเลิกเป็นเพื่อนกับ "มิตรภาพข้างข้างคุณ" ได้อย่างง่ายดายและเราจะไม่ได้ติดต่อกับคุณอีกต่อไปนะค่ะ</h4>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={e => this.setState({ GatsbyLinkClicked: false })}
          style={{ marginLeft: `auto`, marginRight: `auto` }}
        >
          ยกเลิก
        </button>
      </div>
    )
  }

  iconToBeDisplayed(data) {
    if (this.state.is_FB_browser) {
      return this.fbIcon(data)
    } else {
      return this.lineIcon(data)
    }
  }

  lineIcon(data) {
    return (
      <li>
        <a
          className="fab fa-line"
          href={lineLoginURL()}
          onClick={e => localStorage.setItem("loginLink", "LineLink")}
          style={{ fontSize: `200%` }}
          rel="line app"
        ></a>
      </li>
    )
  }

  fbIcon(data) {
    return (
      <li>
        <a
          className="fab fa-facebook-f"
          href={fbLoginURL()}
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
                  {this.Linkage()}
                </span>
                <br/>
                <ul className="social">
                  {this.iconToBeDisplayed(data)}
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
