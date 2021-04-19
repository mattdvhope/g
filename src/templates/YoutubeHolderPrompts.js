import React, { useState } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import YoutubeVideo from "./YoutubeVideo"
import ButtonForPrompt from "./ButtonForPrompt"
import CtaUnderVideo from "./CtaUnderVideo"

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const [promptsElementNum, setPrompt] = useState(0);
  const buttonWords = prompts[promptsElementNum].buttonInvitation;

  const scrollToTopOfBlog = () => window.innerWidth < 1000 ? window.scrollTo(0, 0) : null

  const ButtonProvidedIfNeeded = () => {
    if (promptsElementNum === 0) {
      return (
        <div>
          <hr/>
          <ButtonForPrompt onClick={() => { setPrompt(promptsElementNum + 1); scrollToTopOfBlog(); }} buttonWords={buttonWords} />
        </div>)
    } else if (promptsElementNum !== prompts.length-1) {
      return (
        <div>
          <hr/>
          <h2 onClick={() => { setPrompt(promptsElementNum - 1); scrollToTopOfBlog(); }} >⬅️&nbsp;</h2>
          <ButtonForPrompt onClick={() => { setPrompt(promptsElementNum + 1); scrollToTopOfBlog(); }} buttonWords={buttonWords} />
        </div>)
    } else if (promptsElementNum === prompts.length-1) {
      return (
        <div>
          <br/>
          <h1 onClick={() => { setPrompt(promptsElementNum - 1); scrollToTopOfBlog(); }} >⬅️&nbsp;</h1>
        </div>)
    }
  }

  return (
    <div id="YoutubeHolderPrompts" className="container-fluid">
      <div>
        <YoutubeVideo src={youtubeEmbeddable(data.youtubeUrl)} />
        <hr/>
        <div
          dangerouslySetInnerHTML={{
            __html: prompts[promptsElementNum].promptContent.childMarkdownRemark.html
          }}
        />
        {ButtonProvidedIfNeeded()}
      </div>
    </div>
  )

}

export default YoutubeHolderPrompts