import React, { useState, useEffect } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import YoutubeVideo from "./YoutubeVideo"
import ResponsePrompt from "./ResponsePrompt"

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const firstPrompt = prompts[0];
  const lastPrompt = prompts[prompts.length-1];

// console.log(firstPrompt)
// console.log(lastPrompt)
console.log(YoutubeVideo)

  function ButtonTemplate() {
    return (
    <button
      id="button-for-youtube-survey"
      type="button"
      className="btn btn-outline-success"
      style={{ color: `brown`, borderColor: `#BF8F63`, backgroundColor: `#fff` }}
      onClick={() => null}
    >
      {`BUTTON`}
    </button>
  )}

  // function DealWithButtonPressing(needToPressForSurvey) {
  //   setButtonState(needToPressForSurvey)
  //   setBelowVideo(!needToPressForSurvey)
  // }

  if (data) {
    return (
      <div id="YoutubeHolderPrompts" className="container-fluid">
        <h2 style={{ color: `#BF8F63` }}><i>{data.ctaFirst}</i></h2>
        <hr/>
  			<div>
  				<YoutubeVideo src={youtubeEmbeddable(data.youtubeUrl)} />
  				<hr/>
          <br/>

          {ButtonTemplate()}

          <br/>
          <hr/>
  		  </div>
      </div>
  	)
  } else {
    return null;
  }

}

export default YoutubeHolderPrompts
