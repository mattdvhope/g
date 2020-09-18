import React from "react"

const ButtonForPrompt = ({onClick, buttonWords}) => {
	return (
		<button
      id="button-for-youtube-survey"
      type="button"
      className="btn btn-outline-success"
      style={{ color: `brown`, borderColor: `#BF8F63`, backgroundColor: `#fff` }}
      onClick={() => onClick}
    >
      {buttonWords}
    </button>
  )
}

export default ButtonForPrompt
