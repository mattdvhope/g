import axios from 'axios';
import { sha256 } from 'js-sha256';
import { fbq } from '@hutsoninc/gatsby-plugin-facebook-pixel';

export const FbConversionEvent = (data) => { // To record Conversion Events in FB Events Manager / A "Server Event" (linked to Pixel) from my domain's server
  const timestamp = Math.round(Date.now() / 1000);
  const urlOfEvent = "https://relationshipsthailand.org/" + data.slug;
  const fbFirstName = sha256('matt'); // this is according to FB's rule of using a hashed version of user_data
  const fbLastName = sha256('malone');

  const dataFromEvent =
    {  // "Conversion API": data & url...
      "data": [
          {
              "event_name": "Reading", // <--"Custom Event" (FB "Custom Conversion" will USE it [provide RULES for it])
              "event_time": timestamp,
              "action_source": "website",
              "event_source_url": urlOfEvent,
              "user_data": {
                  // "fn": fbFirstName,
                  // "ln": fbLastName,
                  "fb_login_id": 1588295301,
                  "client_user_agent": "RelationshipsThailand"
              },
              "custom_data": {
                "thisThing": "it" // use this in the RULE in Custom Conversions!!!
              }
          }
      ],
      "test_event_code": "TEST79270"
    };

  const url = `https://graph.facebook.com/v10.0/${process.env.GATSBY_PIXEL_ID}/events?access_token=${process.env.GATSBY_PIXEL_ACCESS_TOKEN}`;

  fbq('track', 'Contact');

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


