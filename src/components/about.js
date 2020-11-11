import React from "react";
import Img from "gatsby-image";

export default ({ data }) => (
  <div className="about section" id="About">
    <div className="container">
      <div className="about-main row">
        <div className="left col-md-5 col-lg-4 mb-3">
          <Img
            fluid={data.photo.fluid}
            objectFit="cover"
            objectPosition="top center"
          />
        </div>
        <div className="left col-md-7 col-lg-8">
          <div className="about-details">
            <h2 className="sub-position">
              {data.designation}
            </h2>
            
      {/* <div
              className="fb-like"
              data-href="https://relationshipsthailand.org/"
              data-width=""
              data-layout="button"
              data-action="like"
              data-size="large"
              data-share="true"
              style={{ border: `none`, overflow: `hidden`, height: `31px` }}
            />  */}      

        {/* <div class="mcwidget-embed" data-widget-id="13149017"></div> */}

            <hr/>
            <div
              dangerouslySetInnerHTML={{
                __html: data.description.childMarkdownRemark.html
              }}
            />
            <hr/>
            <div className="socials">
              <ul>
                <li>
                  <a
                    className="fab fa-facebook-f"
                    href={data.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
                </li>
                <li>
                  <a
                    className="fab fa-line"
                    href={data.line}
                    target="_blank"
                    style={{ fontSize: `200%` }}
                    rel="line app"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);