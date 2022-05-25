import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
// import PropTypes from 'prop-types';
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
      loading: false,
      btnNext: false,
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
    console.log(questionsPack);
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
    });
  }

  handleClickAnswer = () => {
    console.log('ok');
    this.setState({
      btnNext: true,
    });
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
              onClick={ this.questionSetup }
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
