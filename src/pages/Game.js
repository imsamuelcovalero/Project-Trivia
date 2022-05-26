import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getQuestions from '../helpers/questionsAPI';
import { saveUserScore, saveUserAssertion } from '../redux/actions/index';
import gameInitialState from '../helpers/gameInitialState';

class Game extends Component {
  constructor() {
    super();
    this.state = gameInitialState;
  }

  componentDidMount = () => {
    this.questionSetup();
    this.setTimeOut();
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
    const correctAnswers = {
      answer: questionsPack.results[0].correct_answer,
      id: 55,
      veracity: 'correct',
      dificulty: questionsPack.results[0].difficulty,
    };
    const incorrectAnswer = questionsPack.results[0].incorrect_answers;
    const incorrectAnswersObject = Object.entries(incorrectAnswer).map((item, index) => ({
      answer: item[1],
      id: index,
      veracity: 'incorrect',
      dificulty: questionsPack.results[0].difficulty,
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
      buttonDisable: false,
      correctButtonsColor: '',
      incorrectButtonsColor: '',
      counterQuestion: counterQuestion + 1,
    });
  }

  handleClickAnswer = (answer) => {
    const { timer, score, assertions } = this.state;
    const { saveScore, saveAssertion } = this.props;
    const DEZ = 10;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    const { dificulty } = answer;
    let dificuldade = 0;
    if (dificulty === 'easy') {
      dificuldade = EASY;
    } else if (dificulty === 'medium') {
      dificuldade = MEDIUM;
    } else if (dificulty === 'hard') {
      dificuldade = HARD;
    }
    if (answer.veracity === 'correct') {
      const currentScore = DEZ + (timer * dificuldade);
      this.setState({
        score: score + currentScore,
        assertions: assertions + EASY,
      }, () => {
        saveScore(score + currentScore);
        saveAssertion(assertions + EASY);
      });
    } if (answer.veracity === 'incorrect') {
      this.setState({
        score,
        assertions,
      }, () => {
        saveScore(score);
        saveAssertion(assertions);
      });
    }
    this.setState({
      btnNext: true,
      correctButtonsColor: '3px solid rgb(6, 240, 15)',
      incorrectButtonsColor: '3px solid red',
      buttonDisable: true,
    });
    this.updateState(true);
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

  updateState =(click) => {
    const { timer, interval } = this.state;
    if (timer > 0 && click === undefined) {
      return this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }
    clearInterval(interval);
    this.setState({
      buttonDisable: true,
    });
  }

  resetState = () => {
    this.setState({
      timer: 30,
    });
    this.setTimeOut();
  }

  setTimeOut = () => {
    const TIMER = 1000;
    const interval = setInterval(() => {
      this.setState({ interval });
      this.updateState();
    }, TIMER);
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
            onClick={ () => this.handleClickAnswer(answer) }
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
          onClick={ () => this.handleClickAnswer(answer) }
          disabled={ buttonDisable }
        >
          {answer.answer}
        </button>
      );
    });
  }

  render() {
    const { question, category, loading, btnNext, timer } = this.state;
    return (
      <section>
        <h1>Game</h1>
        <Header />
        <h2>{timer}</h2>
        <div>
          { btnNext
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => {
                this.handleClickNext();
                this.resetState();
              } }
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

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(saveUserScore(score)),
  saveAssertion: (assertion) => dispatch(saveUserAssertion(assertion)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveScore: PropTypes.func.isRequired,
  saveAssertion: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
