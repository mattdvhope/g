import React, { useState } from "react";
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable";
import YoutubeVideo from "./YoutubeVideo";
import ButtonForPrompt from "./ButtonForPrompt";
import CtaUnderVideo from "./CtaUnderVideo";

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const [promptsElementNum, setPrompt] = useState(0);
  const buttonWords = prompts[promptsElementNum].buttonInvitation;

  const scrollToTopOfBlog = () => window.innerWidth < 1000 ? window.scrollTo(0, 0) : null

  console.log("Contentful Data: ", data);

  const FbConversionEvent = () => {
    const urlOfEvent = "https://relationshipsthailand.org/" + data.slug;
    const fbFirstName = sha256('Matt'); // this is according to FB's rull of using a hashed version of user_data strings
    const fbLastName = sha256('Malone');

    const dataFromEvent = 
      {
        "data": [
            {
                "event_name": "Reading",
                "event_time": 1619683114,
                "action_source": "website",
                "event_source_url": urlOfEvent,
                "user_data": {
                    "fn": fbFirstName,
                    "ln": fbLastName,
                    "fb_login_id": 1577295302,
                    "client_user_agent": "RelationshipsThailand"
                }
            }
        ]
      };

    const url = "https://graph.facebook.com/v10.0/222946198915072/events?access_token=EAACYmSXRUF0BAFdhl36TI7FrOUx9uEitzbuXWUZAIMYE0f4qiuNzYvKWZATdbWGeES5BE8ivcMR8GjDhVKIb0ZBuHznBdQ0wB7aUn5ZAaOZCim7f4LOVltFaxuOsg6rUVOxR5UxF3C9pbCYY7dDIFG0L3UcHhVRBgq5ZCa7DN00C1c8TLD0V8AutKXzRTIEZA4ZD";

    axios.post(url, dataFromEvent)
    .then(response => {
      console.log(response)
      return response.data.message;
    })
    .catch(function (error) {
      // handle error
      console.log("ERROR: ", error);
    })
  };

  const ButtonProvidedIfNeeded = () => {
    if (promptsElementNum === 0) {
      return (
        <div>
          <hr/>
          <ButtonForPrompt onClick={() => { setPrompt(promptsElementNum + 1); FbConversionEvent(); scrollToTopOfBlog(); }} buttonWords={buttonWords} />
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