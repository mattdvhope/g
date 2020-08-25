import React from "react"

export default ({ choices, question, handleChange }) => {

	return choices.map((choice) => {
		return (
			<>
				<br/>
				<div className="custom-control custom-radio">
				  <input
				  	onChange={handleChange}
				  	name={question}
				  	value={JSON.stringify(choice)}
				  	type="radio"
				  	id={choice.id}
				  	className="custom-control-input"
				  />
				  <label
				  	className="custom-control-label"
				  	htmlFor={choice.id}
				  >
				  	{choice.choice}
				  </label>
				</div>
			</>
		);
	})

}
