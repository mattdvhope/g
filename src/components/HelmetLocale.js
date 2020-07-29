import React from "react"
import { Helmet } from 'react-helmet';

const fb_app = `https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=611958516129057&autoLogAppEvents=1`

export default () => (
  <Helmet>
    <div id="fb-root"></div>
    <script async defer
      crossorigin="anonymous"
      src={fb_app}
      nonce="8n79q7Mj"
    />
  </Helmet>
)

