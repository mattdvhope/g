import React, { Component } from "react";
import { isLoggedIn } from "../utils/auth"
import { Link } from "gatsby";
import Logout from "../components/Logout";

export default class footer extends Component {
  render() {

    const logout = (<span><Logout /></span>)

    const privacy = (
      <span>
        <Link to="/privacy" >
          นโยบายส่วนตัว
        </Link>
      </span>
    )

    return (
      <div className="site-footer" id="footer">
        <div className="container">
          <span>{this.props.siteName}</span>&nbsp; | &nbsp;
          {isLoggedIn() ? logout : privacy}
        </div>
      </div>
    );
  }
}