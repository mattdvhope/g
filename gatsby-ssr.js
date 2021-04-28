import React from "react"


// This is for the website FB Chat Messenger (on bottom-right of website)
export const onRenderBody = (
  { setPreBodyComponents },
  pluginOptions
) => {
  setPreBodyComponents([
    <script
      key="fun_javascript"
      dangerouslySetInnerHTML={{ __html: `
        window.fbAsyncInit = function() {
          window.FB.init({
            xfbml            : true,
            version          : 'v10.0'
          });
        };

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/th_TH/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `,
      }}
    />,
    <div class="fb-customerchat"
      attribution="page_inbox"
      page_id="106619367753772">
    </div>
  ])
}