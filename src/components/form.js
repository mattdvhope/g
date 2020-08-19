import React, { Component } from "react"
import { navigate } from "gatsby";
import { graphql } from "gatsby";
import axios from 'axios'
import FormChoices from "./formChoices";
import { preventTooManyChoices, updatedQuestions, final_selections_of_choices } from "../utils/handleQuestionChoices"
// import { persistQuestions } from "../utils/railsVisits" 
import { getUser } from "../utils/auth"
import YoutubeHolder from "./YoutubeHolder"

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      question: undefined,
      choice_selected: undefined,
      selected_in_question: [],
      survey_done: false,
      document: undefined,
      final_selections_of_choices: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ document: document })
  }

	handleChange = e => {
    let question = JSON.parse(e.target.name)
    const choice_selected = JSON.parse(e.target.value)
		const selected_in_question = this.state.selected_in_question
		question = preventTooManyChoices(selected_in_question, choice_selected, question)
    const updated = updatedQuestions(this.state.questions, question)
    const latest = final_selections_of_choices(updated)
    this.setState({
      questions: updated,
    	question: question,
    	choice_selected: choice_selected,
    	selected_in_question: selected_in_question,
      final_selections_of_choices: latest
    });
  }

	handleSubmit(e) {
    e.preventDefault();
    this.setState({ survey_done: true })

    console.log("USER:", getUser())

    axios.post(`${process.env.GATSBY_RAILS_ANON_SURVEYS}`, {
      contentful_id: this.props.survey_id,
      survey_title: this.props.title,
      questions: this.state.final_selections_of_choices,
      fb_id: getUser().id,
      line_id: getUser().sub
    })
    .then(response => {
      console.log(response)
      return response.data.message;
    })
  }

  render() {
    return (
      <YoutubeHolder/>
    )
	}
}

export const FormQuery = graphql`
  query FormQuery {
    contentfulPhotos {
      photos {
        file {
          url
        }
        fluid(maxWidth: 600) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`;