import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getQuestions from '../helpers/questionsAPI';
import { saveUserScore } from '../redux/actions/index';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      question: [],
      category: '',
      answers: [],
      buttonDisable: false,
      loading: false,
      timer: 0,
      score: 0,
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
    });
  }

  handleClickAnswer = (answer) => {
    console.log('answer', answer);
    const { timer, score } = this.state;
    const { saveScore } = this.props;
    const DEZ = 10;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    const { dificulty } = answer.dificulty;
    let dificuldade = 0;
    if (dificulty === 'easy') {
      dificuldade = EASY;
    } else if (dificulty === 'medium') {
      dificuldade = MEDIUM;
    } else if (dificulty === 'hard') {
      dificuldade = HARD;
    }
    // let score = 0;
    if (answer.veracity === 'correct') {
      const currentScore = DEZ + (timer * dificuldade);
      this.setState({
        score: score + currentScore,
      });
      // score += currentScore;
      // console.log('score', score);
      // return score;
    } if (answer.veracity === 'incorrect') {
      this.setState({
        score,
      });
      // score += 0;
      // console.log('score', score);
      // return score;
    }
    console.log('score', score);
    saveScore(score);
    // history.push('/Game');
    this.questionSetup();
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
            // value="wrong"
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
          data-testid="correct-answer"
          type="button"
          // value="correct"
          onClick={ () => this.handleClickAnswer(answer) }
          disabled={ buttonDisable }
        >
          {answer.answer}
        </button>
      );
    });
  }

  render() {
    const { question, category, loading } = this.state;
    // console.log(category);
    return (
      <section>
        <h1>Game</h1>
        <Header />
        <div>
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

// const mapStateToProps = (globalState) => ({
//   userScore: globalState.player.score,
// });

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(saveUserScore(score)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // userScore: PropTypes.number.isRequired,
  saveScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
