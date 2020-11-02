import { Link } from "gatsby";
import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  render() {
    const { data, header } = this.props;
    const { menu } = this.state;
    return (
      <header className={`site-header ${menu ? "active" : ""}`}>
        <div className="container">
          <div className="header-main">
            <div className="logo">
              <Link to="/">
                {data.logo.file.url ? (
                  <img src={data.logo.file.url} alt="logo" height="53vh" style={{ position: `absolute`, top: `6px` }}/>
                ) : (
                  <span>{data.siteName}</span>
                )}
              </Link>
            </div>
            <div
              className="responsive-menu"
              onClick={() => {
                this.setState({
                  menu: !menu
                });
              }}
            >
              <span></span>
            </div>
            {header === "home" ? (
              <div className="menu">
                <ul
                  onClick={() => {
                    this.setState({
                      menu: false
                    });
                  }}
                >
                  <li>
                    <Link to="/#home">หน้าแรก</Link>
                  </li>
                  {data.menus
                    .filter(item => item === "About")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#About`}>เกี่ยวกับเรา</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Service")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#Service`}>Service</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Surveys")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#Surveys`}>Surveys</Link>
                        </li>
                      );
                    })}

                  {data.menus
                    .filter(item => item === "Blogs")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#Blogs`}>วิดีโอ</Link>
                        </li>
                      );
                    })}

                  {data.menus
                    .filter(item => item === "Work")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#Work`}>Work</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Testimonials")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#Testimonials`}>Testimonials</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Photos")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#Photos`}>Photos</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Contact")
                    .map(t => {
                      return (
                        <li key={t} >
                          <Link to={`/#Contact`}>Contact</Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : (
              <div className="menu">
                <ul
                  onClick={() => {
                    this.setState({
                      menu: false
                    });
                  }}
                >
                  <li>
                    <Link to="/#home">หน้าแรก</Link>
                  </li>
                  {data.menus
                    .filter(item => item === "Surveys")
                    .map(t => {
                      return (
                        <li key={t}>
                          <Link to="/surveys">Surveys</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Blogs")
                    .map(t => {
                      return (
                        <li key={t}>
                          <Link to="/videos">วิดีโอ</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Photos")
                    .map(t => {
                      return (
                        <li key={t}>
                          <Link to="/photos">Photos</Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}
