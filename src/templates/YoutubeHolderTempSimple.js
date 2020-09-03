import React, { useState, useEffect } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import FormYoutubeSurvey from "./formYoutubeSurvey"

const YoutubeHolder = ({data}) => {

	function ElementBelowVideo(data) {
		return (
			<div
        dangerouslySetInnerHTML={{
          __html: data.description.childMarkdownRemark.html
        }}
      />)
	}

	function ctaLast(data) {
		return (
			<div
        dangerouslySetInnerHTML={{
          __html: data.ctaLast.childMarkdownRemark.html
        }}
      />)
	}

console.log(data.ctaLast)

  if (data) {
    return (
      <div id="YoutubeHolder" className="container-fluid">
        <h2 style={{ color: `#BF8F63` }}><i>{data.ctaFirst}</i></h2>
        <hr/>
  			<div>
  				<iframe // Youtube video 
  					id="FrameHolder"
  		      style={{
  					  marginLeft: `auto`,
  					  marginRight: `auto`,
  		        height: `49vw`,
  		        width: `81vw`,
  		      }}
            src={youtubeEmbeddable(data.youtubeUrl)}
  		      frameBorder="0"
  		      allowFullScreen
  		    />
  				<hr/>
  		    {ElementBelowVideo(data)}
  		  </div>
  		  <hr/>
					{ctaLast(data)}
  		  <hr/>
      </div>
  	)
  } else {
    return null;
  }

}

export default YoutubeHolder