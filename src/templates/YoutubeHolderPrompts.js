import React, { useState } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import YoutubeVideo from "./YoutubeVideo"
import ButtonForPrompt from "./ButtonForPrompt"
import CtaUnderVideo from "./CtaUnderVideo"

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const [promptsElementNum, setPrompt] = useState(0);
  const buttonWords = prompts[promptsElementNum].buttonInvitation;

  const scrollToTopOfBlog = () => {
    window.scrollTo(0, 0);
  }

  const ButtonProvidedIfNeeded = () => {
    if (promptsElementNum === 0) {
      return (
        <div>
          <hr/>
          <ButtonForPrompt onClick={() => { setPrompt(promptsElementNum + 1); scrollToTopOfBlog(); }} buttonWords={buttonWords} />
          <hr/>
        </div>)
    } else if (promptsElementNum !== prompts.length-1) {
      return (
        <div>
          <hr/>
          <h2 onClick={() => { setPrompt(promptsElementNum - 1); scrollToTopOfBlog(); }} >⬅️&nbsp;</h2>
          <ButtonForPrompt onClick={() => { setPrompt(promptsElementNum + 1); scrollToTopOfBlog(); }} buttonWords={buttonWords} />
          <hr/>
        </div>)
    } else if (promptsElementNum === prompts.length-1) {
      return (
        <div>
          <br/>
          <h1 onClick={() => { setPrompt(promptsElementNum - 1); scrollToTopOfBlog(); }} >⬅️&nbsp;</h1>
          <hr/>
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

  {/* <div style={{position: `relative`, width: `150px`}} className="mcwidget-embed" data-widget-id="13149017"></div>
      <hr/>    */}
      <CtaUnderVideo data={data} />
    </div>
  )

}

export default YoutubeHolderPrompts