import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import getQuestions from '../helpers/questionsAPI';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      question: [],
      category: '',
      answers: [],
      buttonDisable: false,
    };
  }

  componentDidMount = () => {
    this.questionSetup();
  }

  questionSetup = async () => {
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

    const { results } = questionsPack;
    results[0].correctAnswer = results[0].correct_answer;
    delete results[0].correct_answer;
    results[0].incorrectAnswers = results[0].incorrect_answers;
    delete results[0].incorrect_answers;
    const correctAnswers = {
      answer: questionsPack.results[0].correctAnswer,
      id: 55,
      veracity: 'correct',
    };

    const incorrectAnswer = questionsPack.results[0].incorrectAnswers;
    const incorrectAnswersObject = Object.entries(incorrectAnswer).map((item, index) => ({

      answer: item[1],
      id: index,
      veracity: 'incorrect',

    }));
    incorrectAnswersObject.push(correctAnswers);
    const NUMBER = 0.5;
    const randomAnswers = incorrectAnswersObject.sort(() => Math.random() - NUMBER);
    this.setState({
      question: questionsPack.results[0].question,
      category: questionsPack.results[0].category,
      answers: randomAnswers,
    });
  }

  handleClickAnswer = () => {
    console.log('ok');
  }

  answerButtonSetup = () => {
    const { buttonDisable, answers } = this.state;
    return answers.map((answer) => {
      if (answer.veracity === 'incorrect') {
        return (
          <button
            key={ answer.id }
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
    const { question, category } = this.state;
    console.log(category);
    return (
      <section>
        <h1>Game</h1>
        <div>
          <div>
            <div data-testid="question-category">
              { category }
            </div>
            <div data-testid="question-text">
              { question }
            </div>
            <div data-testid="answer-options">
              {this.answerButtonSetup()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

/* const mapStateToProps = (state) => ({
  globalState: state,
}); */

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
//   userLogin: PropTypes.func.isRequired,
};

export default /* connect(mapStateToProps, null)( */Game/* ) */;
