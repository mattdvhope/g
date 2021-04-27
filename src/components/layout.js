import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";
import Helmet from "react-helmet";
import Header from "./header";
import Footer from "./footer";
import "../css/style.css";
import "../css/font-awesome.css";
import { MsChatPluginCode } from "../utils/MsChatPluginCode"

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}


const Layout = ({ children, header }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulHomePage {
            siteName
            siteDescription
            logo {
              file {
                url
              }
            }
            menus
          }
        }
      `}
      
      render={data => (
        <>
          <Helmet>
            <div id="fb-root"></div>
            <script async defer
              crossorigin="anonymous"
              src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=611958516129057&autoLogAppEvents=1"
              nonce="PFVZXkQp"
            />

            {/* FB Messenger Chat Plugin Code */}
            <script src={MsChatPluginCode} type="text/javascript" />

            {/* Your FB Chat Plugin code */}
            <div class="fb-customerchat"
              attribution="page_inbox"
              page_id="106619367753772">
            </div>
          </Helmet>

          <Header
            data={data.contentfulHomePage}
            siteTitle={data.contentfulHomePage.siteName}
            header={header}
          />
          <div>
            <main id="home">{children}</main>
          </div>
          <Footer siteName={data.contentfulHomePage.siteName} />
          <script>
            alert("Hello");
          </script>
        </>
      )}
    />
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
