import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import FormYoutubeSurvey from "./formYoutubeSurvey"

const YoutubeHolder = () => {
	const oldWords = "คลิกที่นี่เพื่อแบ่งปันความคิดเกี่ยวกับวิดีโอนี้"
	const newWords = "คลิกที่นี่เพื่อซ่อนคำถาม"
	const [buttonPressed, setButtonState] = useState(false);
	const [belowVideoThere, setBelowVideo] = useState(true);

	// useEffect(() => {
 //    const posY = window.scrollY + document.getElementById("YoutubeHolder").getBoundingClientRect().top
 //    document.documentElement.scrollTop = posY - 65;
 //  });

	let buttonElement;
	if (buttonPressed === false) {
		buttonElement = ButtonTemplate(true, oldWords)
	} else {
		buttonElement = ButtonTemplate(false, newWords)
	}

	function ButtonTemplate(needToPressForSurvey, wordsType) {
		return (
		<button
			id="button-for-youtube-survey"
			type="button"
			className="btn btn-outline-success"
			style={{ color: `brown`, borderColor: `#BF8F63`, backgroundColor: `#fff` }}
			onClick={() => DealWithButtonPressing(needToPressForSurvey)}
		>
			{wordsType}
		</button>
	)}

	function DealWithButtonPressing(needToPressForSurvey) {
		setButtonState(needToPressForSurvey)
		setBelowVideo(!needToPressForSurvey)
	}

	const formYT = buttonPressed ? <FormYoutubeSurvey/> : null;

	function ElementBelowVideo(data) {
		if (belowVideoThere) { 
			return (
				<div
          dangerouslySetInnerHTML={{
            __html: data.contentfulSurveys.belowVideo.childMarkdownRemark.html
          }}
        />)
		} else return null
	}

	return (
	  <StaticQuery
	    query={detailsQuery}
	    render={data => {
				

	      return (
	        <div id="YoutubeHolder" className="container-fluid">
	          <h2 style={{ color: `#BF8F63` }}><i>{data.contentfulSurveys.furtherCta}</i></h2>
	      {/* <p style={{ fontSize: `125%` }} >{data.contentfulSurveys.belowCta}</p>  */}
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
					      src={youtubeEmbeddable(data.contentfulSurveys.youtubeUrl)}
					      frameBorder="0"
					      allowFullScreen
					    />
							{buttonElement}
							{formYT}
							<hr/>
					    {ElementBelowVideo(data)}
					  </div>
	        </div>
	      );
	    }}
	  />
	)
}

export default YoutubeHolder

const detailsQuery = graphql`
  query YoutubeHolderQuery {
    contentfulSurveys(slug: {}, belowVideo: {belowVideo: {}}) {
			furtherCta
      belowCta
      youtubeUrl
      belowVideo {
        childMarkdownRemark {
	        html
	      }
      }
    }
  }
`;

