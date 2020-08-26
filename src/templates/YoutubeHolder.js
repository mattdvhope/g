import React, { useState, useEffect } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import FormYoutubeSurvey from "./formYoutubeSurvey"

const YoutubeHolder = ({data}) => {

	const oldWords = "คลิกที่นี่เพื่อแบ่งปันความคิดเกี่ยวกับวิดีโอนี้"
	const newWords = "คลิกที่นี่เพื่อซ่อนคำถาม"
	const [buttonPressed, setButtonState] = useState(false);
	const [belowVideoThere, setBelowVideo] = useState(true);

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

	const formYT = buttonPressed ? <FormYoutubeSurvey data={data} /> : null;

	function ElementBelowVideo(data) {
		if (belowVideoThere) { 
			return (
				<div
          dangerouslySetInnerHTML={{
            __html: data.description.childMarkdownRemark.html
          }}
        />)
		} else return null
	}

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
  				{buttonElement}
  				{formYT}
  				<hr/>
  		    {ElementBelowVideo(data)}
  		  </div>
      </div>
  	)
  } else {
    return null;
  }

}

export default YoutubeHolder
