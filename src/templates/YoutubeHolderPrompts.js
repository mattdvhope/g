import React, { useState } from "react";
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { fbq } from 'gatsby-plugin-facebook-pixel';
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable";
import YoutubeVideo from "./YoutubeVideo";
import ButtonForPrompt from "./ButtonForPrompt";
import CtaUnderVideo from "./CtaUnderVideo";

const YoutubeHolderPrompts = ({data}) => {

  const prompts = data.promptsForResponse;
  const [promptsElementNum, setPrompt] = useState(0);
  const buttonWords = prompts[promptsElementNum].buttonInvitation;

  const scrollToTopOfBlog = () => window.innerWidth < 1000 ? window.scrollTo(0, 0) : null

  const FbConversionEvent = () => { // To record Conversion Events in FB Events Manager / A "Server Event" (linked to Pixel) from my domain's server
    const timestamp = Math.round(Date.now() / 1000);
    const urlOfEvent = "https://relationshipsthailand.org/" + data.slug;
    const fbFirstName = sha256('mark'); // this is according to FB's rule of using a hashed version of user_data
    const fbLastName = sha256('mallory');

    const dataFromEvent = 
      {
        "data": [
            {
                "event_name": "ReadingMore",
                "event_time": timestamp,
                "action_source": "website",
                "event_source_url": urlOfEvent,
                "user_data": {
                    // "fn": fbFirstName,
                    // "ln": fbLastName,
                    "fb_login_id": 1577295511, // not me!!
                    "client_user_agent": "RelationshipsThailand"
                },
                "custom_data": {
                  "thisThing": "it"
                }
            }
        ],
        "test_event_code": "TEST79270"
      };

    const url = `https://graph.facebook.com/v10.0/${process.env.GATSBY_PIXEL_ID}/events?access_token=${process.env.GATSBY_PIXEL_ACCESS_TOKEN}`;

    axios.post(url, dataFromEvent)
    .then(response => {
      console.log(response)
      return response.data.message;
    })
    .catch(function (error) {
      // handle error
      console.log("ERROR: ", error);
    })
  }; // const FbConversionEvent, ending bracket

  fbq('track', 'Purchase', {currency: "USD", value: 30.00});

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