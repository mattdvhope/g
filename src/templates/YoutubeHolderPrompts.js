import React, { useState, useEffect } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import YoutubeVideo from "./YoutubeVideo"
import ButtonForPrompt from "./ButtonForPrompt"
import ResponsePrompt from "./ResponsePrompt"

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const firstPrompt = prompts[0];
  const lastPrompt = prompts[prompts.length-1];

  // const [buttonPressed, setButtonState] = useState(false);
  // const [buttonWords, setButtonWords] = useState(firstPrompt.buttonInvitation);
  const [promptsElementNum, setPrompt] = useState(0);



  function DealWithButtonPressing() {
    console.log("pressed!!!!")
    // setPrompt(promptsElementNum + 1)
  }

  if (data) {
    return (
      <div id="YoutubeHolderPrompts" className="container-fluid">
        <h2 style={{ color: `#BF8F63` }}><i>{data.ctaFirst}</i></h2>
        <hr/>
  			<div>
  				<YoutubeVideo src={youtubeEmbeddable(data.youtubeUrl)} />
          <hr/>
          <br/>

          <ButtonForPrompt onClick={() => DealWithButtonPressing(true)} buttonWords={prompts[promptsElementNum].buttonInvitation} />

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