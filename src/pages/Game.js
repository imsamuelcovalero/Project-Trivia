import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiClock } from 'react-icons/fi';
import { decode } from 'he';
import Header from '../components/Header';
import getQuestions from '../helpers/questionsAPI';
import { saveUserScore, saveUserAssertion } from '../redux/actions/index';
import gameInitialState from '../helpers/gameInitialState';
import CardQuestion from '../components/CardQuestion';

class Game extends Component {
  constructor() {
    super();
    this.state = gameInitialState;
  }

  componentDidMount = async () => {
    const { history } = this.props;
    const recoveredToken = localStorage.getItem('token');
    const questionsPack = await getQuestions(recoveredToken);
    const EXPIRED_RESPONSE_CODE = 3;
    if (questionsPack.response_code === EXPIRED_RESPONSE_CODE) {
      localStorage.clear();
      history.push('/');
      return;
    }
    this.setState({
      apiQuestions: questionsPack,
    });
    this.setTimeOut();
    this.questionSetup();
  }

  questionSetup = () => {
    const { counterQuestion, apiQuestions } = this.state;
    const correctAnswers = {
      answer: apiQuestions.results[counterQuestion].correct_answer,
      id: 55,
      veracity: 'correct',
      dificulty: apiQuestions.results[counterQuestion].difficulty,
    };
    const incorrectAnswer = apiQuestions.results[counterQuestion].incorrect_answers;
    const incorrectAnswersObject = Object.entries(incorrectAnswer).map((item, index) => ({
      answer: item[1],
      id: index,
      veracity: 'incorrect',
      dificulty: apiQuestions.results[counterQuestion].difficulty,
    }));
    incorrectAnswersObject.push(correctAnswers);
    const NUMBER = 0.5;
    const randomAnswers = incorrectAnswersObject.sort(() => Math.random() - NUMBER);
    this.setState({
      loading: true,
      category: apiQuestions.results[counterQuestion].category,
      question: apiQuestions.results[counterQuestion].question,
      answers: randomAnswers,
      btnNext: false,
      buttonDisable: false,
      correctButtonsColor: '',
      incorrectButtonsColor: '',
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
    const LASTQUESTION = 4;
    if (counterQuestion === LASTQUESTION) {
      history.push('/Feedback');
    } else {
      this.setState({ counterQuestion: counterQuestion + 1 }, () => {
        this.questionSetup();
      });
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
            className="bg-amber-300 p-2 mx-8 hover:scale-105 transition disabled:bg-red-400 disabled:text-white disabled:hover:scale-100 rounded border-2 border-black text-black font-bold disabled:brightness-75"
          >
            {decode(answer.answer)}
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
          className="bg-amber-300 p-2 mx-8 transition hover:scale-105 disable:bg-green-600  disabled:hover:scale-100 rounded border-2 border-black text-black font-bold disabled:brightness-75"
          disabled={ buttonDisable }
        >
          {decode(answer.answer)}
        </button>
      );
    });
  }

  render() {
    const { question, category, loading, btnNext, timer, buttonDisable } = this.state;
    const Timer = 10;
    return (
      <section className="bg-amber-300 flex flex-col items-center min-h-screen">
        <div className="w-full">
          <Header />
        </div>
        <section>
          <div className="flex justify-end items-center mr-8 mb-1">
            <FiClock
              className={ `
                text-lg
               ${timer === 0 || buttonDisable === true ? 'animate-none' : 'animate-spin'} 
              ` }
            />
            <h2
              className={ ` 
                ${timer <= Timer ? 'animate-pulse text-red-400' : ''} 
                text-lg text-black bg-purple-400 w-12 m-1 text-center p-2
                rounded-r-full` }
              data-testid="timer"
            >
              {timer}
            </h2>
          </div>
          <div className="flex flex-col h-screen items-center">
            {loading
            && (
              <CardQuestion
                category={ category }
                question={ question }
                answerButtonSetup={ this.answerButtonSetup }
              />
            )}
            { (btnNext || timer === 0 || buttonDisable === true)
          && (
            <div className=" w-full flex justify-end items-center mt-2 ">
              <button
                type="button"
                data-testid="btn-next"
                className="mr-8 p-2 px-4 bg-purple-400 rounded font-bold text-amber-300"
                onClick={ () => {
                  this.handleClickNext();
                  this.resetState();
                } }
              >
                Next
              </button>
            </div>
          )}
          </div>
        </section>
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
