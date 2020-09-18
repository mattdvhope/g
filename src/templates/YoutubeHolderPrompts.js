import React, { useState, useEffect } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import YoutubeVideo from "./YoutubeVideo"
import ButtonForPrompt from "./ButtonForPrompt"

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const lastPrompt = prompts[prompts.length-1];
  const [promptsElementNum, setPrompt] = useState(0);

  const DealWithButtonPressing = () => {
    promptsElementNum !== prompts.length-1 ? setPrompt(promptsElementNum + 1) : setPrompt(promptsElementNum - 1);
  }

  const EveryButLastElement = () => (
    <div id="YoutubeHolderPrompts" className="container-fluid">
      <h2 style={{ color: `#BF8F63` }}><i>{data.ctaFirst}</i></h2>
      <hr/>
      <div>
        <YoutubeVideo src={youtubeEmbeddable(data.youtubeUrl)} />
        <hr/>
        <div
          dangerouslySetInnerHTML={{
            __html: prompts[promptsElementNum].promptContent.childMarkdownRemark.html
          }}
        />
        <hr/>
        <ButtonForPrompt onClick={() => DealWithButtonPressing()} buttonWords={prompts[promptsElementNum].buttonInvitation} />
        <br/>
        <hr/>
      </div>
    </div>
  )

    return EveryButLastElement();

}

export default YoutubeHolderPrompts