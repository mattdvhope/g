import React from "react"

const ResponsePrompt = ({data}) => {
	return (
		<div
      dangerouslySetInnerHTML={{
        __html: data.promptsForResponse[0].promptContent.childMarkdownRemark.html
      }}
    />
  )
}

export default ResponsePrompt
