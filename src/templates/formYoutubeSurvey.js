import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";
import FormChoices from "./formChoices";
import LineIcon from "../images/LINE_APP.png"
import axios from 'axios'
import { getUser } from "../utils/auth"
import { preventTooManyChoices, updatedQuestions, final_selections_of_choices } from "../utils/handleQuestionChoices"
import { rubyQuestions } from "../utils/rubyStyleObjs"

const FormYoutubeSurvey = () => {

  const [quests, setQuestions] = useState(undefined);
  const [selected_in_question, setSelected] = useState([]);
  const [final_choices, setFinal] = useState([]);

  const [submitted, setSubmittedState] = useState(false);
	
  useEffect(() => {
    const posY = window.scrollY + document.getElementById("YoutubeHolder").getBoundingClientRect().top
		if (submitted) {document.documentElement.scrollTop = posY}
  });

	return (
	  <StaticQuery
	    query={detailsQuery}
	    render={data => {

        const { survey } = data.contentfulBlogs

        if (!quests){
          setQuestions(survey)
        }

      	function handleChange(e) {
          let question = JSON.parse(e.target.name)
          const choice_selected = JSON.parse(e.target.value)
          question = preventTooManyChoices(selected_in_question, choice_selected, question)
          const updated = updatedQuestions(rubyQuestions(quests), question)
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
            contentful_id: data.contentfulBlogs.id,
            survey_title: data.contentfulBlogs.title,
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
                    __html: data.contentfulBlogs.ctaLast.childMarkdownRemark.html
                  }}
                />
			    		</h2>
		    		</div>
		    	)
		    }
	    }}
	  />
	)
}

const handleSubmit = () => console.log("in handleSubmit")

export default FormYoutubeSurvey

const detailsQuery = graphql`
  query YoutubeSurveyQuery {
    contentfulBlogs(title: {eq: "พระเยซูคือใคร"}) {
      id
      title
      survey {
        id
        question
        questionChoices {
          id
          choice
        }
      }
      ctaLast {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

