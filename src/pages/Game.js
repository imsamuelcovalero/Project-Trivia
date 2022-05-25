import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getQuestions from '../helpers/questionsAPI';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      question: [],
      category: '',
      answers: [],
      buttonDisable: false,
      loading: false,
      btnNext: false,
      correctButtonsColor: '',
      incorrectButtonsColor: '',
      counterQuestion: 0,
    };
  }

  componentDidMount = () => {
    this.questionSetup();
  }

  questionSetup = async () => {
    const { counterQuestion } = this.state;
    const { history } = this.props;
    const recoveredToken = localStorage.getItem('token');
    const questionsPack = await getQuestions(recoveredToken);
    const EXPIRED_RESPONSE_CODE = 3;
    if (questionsPack.response_code === EXPIRED_RESPONSE_CODE) {
      localStorage.clear();
      history.push('/');
    }
    /* const min = 0;
    const questionMax = questionsPack.results.length;
    const randomQuestion = min + Math.random() * (questionMax - min); */

    const correctAnswers = {
      answer: questionsPack.results[0].correct_answer,
      id: 55,
      veracity: 'correct',
    };

    const incorrectAnswer = questionsPack.results[0].incorrect_answers;
    const incorrectAnswersObject = Object.entries(incorrectAnswer).map((item, index) => ({

      answer: item[1],
      id: index,
      veracity: 'incorrect',

    }));
    incorrectAnswersObject.push(correctAnswers);
    const NUMBER = 0.5;
    const randomAnswers = incorrectAnswersObject.sort(() => Math.random() - NUMBER);
    this.setState({
      loading: true,
      category: questionsPack.results[0].category,
      question: questionsPack.results[0].question,
      answers: randomAnswers,
      btnNext: false,
      counterQuestion: counterQuestion + 1,
    });
  }

  handleClickAnswer = () => {
    console.log('ok');
    this.setState({
      btnNext: true,
      correctButtonsColor: '3px solid rgb(6, 240, 15)',
      incorrectButtonsColor: '3px solid red',
    });
  }

  handleClickNext = () => {
    const { counterQuestion } = this.state;
    const { history } = this.props;
    const LASTQUESTION = 5;
    if (counterQuestion === LASTQUESTION) {
      history.push('/Feedback');
    } else {
      (this.questionSetup());
    }
  }

  answerButtonSetup = () => {
    const { buttonDisable,
      answers,
      correctButtonsColor,
      incorrectButtonsColor } = this.state;

    const correctButtonStyle = {
      border: `${correctButtonsColor}`,
    };
    const incorrectButtonStyle = {
      border: `${incorrectButtonsColor}`,
    };

    return answers.map((answer) => {
      if (answer.veracity === 'incorrect') {
        return (
          <button
            key={ answer.id }
            style={ incorrectButtonStyle }
            data-testid={ `wrong-answer-${answer.id}` }
            type="button"
            onClick={ this.handleClickAnswer }
            disabled={ buttonDisable }
          >
            {answer.answer}
          </button>
        );
      }
      return (
        <button
          key={ answer.id }
          style={ correctButtonStyle }
          data-testid="correct-answer"
          type="button"
          onClick={ this.handleClickAnswer }
          disabled={ buttonDisable }
        >
          {answer.answer}
        </button>
      );
    });
  }

  render() {
    const { question, category, loading, btnNext } = this.state;
    console.log(category);
    return (
      <section>
        <h1>Game</h1>
        <Header />
        <div>
          { btnNext
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleClickNext }
            >
              Next
            </button>
          )}
          {loading
          && (
            <div>
              <span data-testid="question-category">
                { category }
              </span>
              <div data-testid="question-text">
                { question }
              </div>
              <div data-testid="answer-options">
                {this.answerButtonSetup()}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
