import React, { useState, useEffect } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import ResponsePrompt from "./ResponsePrompt"

const YoutubeHolder = ({data}) => {

	const oldWords = "data.responsePrompt.buttonInvitation"
	const newWords = "คลิกที่นี่เพื่อซ่อนคำถาม"
	const [buttonPressed, setButtonState] = useState(false);
	const [belowVideoThere, setBelowVideo] = useState(true);

	let buttonElement;
	if (buttonPressed === false) {
		buttonElement = ButtonTemplate(true, oldWords)
	} else {
		buttonElement = ButtonTemplate(false, newWords)
	}

	function ButtonTemplate(needToPressForSurvey, buttonWords) {
		return (
		<button
			id="button-for-youtube-survey"
			type="button"
			className="btn btn-outline-success"
			style={{ color: `brown`, borderColor: `#BF8F63`, backgroundColor: `#fff` }}
			onClick={() => DealWithButtonPressing(needToPressForSurvey)}
		>
			{buttonWords}
		</button>
	)}

	function DealWithButtonPressing(needToPressForSurvey) {
		setButtonState(needToPressForSurvey)
		setBelowVideo(!needToPressForSurvey)
	}

	const formYT = buttonPressed ? <ResponsePrompt data={data} /> : null;

  function UnderVideo(data) {
    return (
      <div>
        <div class="mcwidget-embed" data-widget-id="13149017"></div>
        <hr/>
        {Description(data)}
        <hr/>
        {ctaLast(data)}
      </div>
    )
  }

	function Description(data) {
		if (belowVideoThere) { 
			return (
				<div
          dangerouslySetInnerHTML={{
            __html: data.description.childMarkdownRemark.html
          }}
        />)
		} else return null
	}

  function ctaLast(data) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data.ctaLast.childMarkdownRemark.html
        }}
      />
    )
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
          <hr/>
          {UnderVideo(data)}
  				<hr/>
  		  </div>
      </div>
  	)
  } else {
    return null;
  }

}

export default YoutubeHolder
