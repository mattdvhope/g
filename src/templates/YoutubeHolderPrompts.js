import React, { useState } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import YoutubeVideo from "./YoutubeVideo"
import ButtonForPrompt from "./ButtonForPrompt"

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const [promptsElementNum, setPrompt] = useState(0);
  const ButtonProvidedIfNeeded = () => {
    if (promptsElementNum !== prompts.length-1) {
      return (<ButtonForPrompt onClick={() => setPrompt(promptsElementNum + 1)} buttonWords={prompts[promptsElementNum].buttonInvitation} />)
    } else {
      return (<div dangerouslySetInnerHTML={{ __html: data.ctaLast.childMarkdownRemark.html }} />)
    }
  }

  return (
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
        {ButtonProvidedIfNeeded()}
        <hr/>
      </div>
    </div>
  )

}

export default YoutubeHolderPrompts