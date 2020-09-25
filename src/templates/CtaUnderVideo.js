import React, { useState, useEffect } from "react"
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import ResponsePrompt from "./ResponsePrompt"

const CtaUnderVideo = ({data}) => {

  if (data) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data.ctaLast.childMarkdownRemark.html
        }}
      />
  	)
  } else {
    return null;
  }

}

export default CtaUnderVideo
