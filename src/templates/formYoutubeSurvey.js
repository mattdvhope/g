import React, { useState, useEffect } from "react"
import FormChoices from "./formChoices";
import LineIcon from "../images/LINE_APP.png"
import axios from 'axios'
import { getUser } from "../utils/auth"
import { preventTooManyChoices, updatedQuestions, final_selections_of_choices } from "../utils/handleQuestionChoices"
import { rubyQuestions } from "../utils/rubyStyleObjs"

const FormYoutubeSurvey = ({data}) => {

  const [questions, setQuestions] = useState(undefined);
  const [selected_in_question, setSelected] = useState([]);
  const [final_choices, setFinal] = useState([]);
  const [submitted, setSubmittedState] = useState(false);
	
  useEffect(() => {
    const posY = window.scrollY + document.getElementById("YoutubeHolder").getBoundingClientRect().top
		if (submitted) {document.documentElement.scrollTop = posY}
  });

  const survey = data.survey

  if (!questions){
    setQuestions(survey)
  }

	function handleChange(e) {
    let question = JSON.parse(e.target.name)
    const choice_selected = JSON.parse(e.target.value)
    question = preventTooManyChoices(selected_in_question, choice_selected, question)
    const updated = updatedQuestions(rubyQuestions(questions), question)
    const latest = final_selections_of_choices(updated)
    setQuestions(updated)
    setSelected([choice_selected])
    setFinal(latest)
	}

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedState(true)
    document.getElementById("button-for-youtube-survey").remove();

    axios.post(`${process.env.GATSBY_RAILS_ANON_SURVEYS}`, {
      contentful_id: data.id,
      survey_title: data.title,
      questions: final_choices,
      fb_id: getUser().id,
      line_id: getUser().sub
    })
    .then(response => {
      console.log(response)
      return response.data.message;
    })
  }

  const youTubeSurveyForm = (
		<div className="container-fluid">
			<hr/>
			<form onSubmit={handleSubmit} >
				{survey.map((item) => {
					return (
						<div key={item.id}>
						  <h3>
						    {item.question}
						    <br/>
						    <FormChoices
						    	choices={item.questionChoices}
						    	question={JSON.stringify(item)}
						    	handleChange={handleChange}
						    />
						  </h3>
						  <br/>
						</div>
					);
				})}
			  <button type="submit" className="btn btn-success">"ส่ง"</button>
			</form>
		</div>
  );

	if (!submitted) {
    return youTubeSurveyForm;
  } else {
  	return (
  		<div>
        <br/>
    		<h2>
          <div
            dangerouslySetInnerHTML={{
              __html: data.ctaLast.childMarkdownRemark.html
            }}
          />
    		</h2>
  		</div>
  	)
  }
}

export default FormYoutubeSurvey
