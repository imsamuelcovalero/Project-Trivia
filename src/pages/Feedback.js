import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveRanking from '../helpers/saveRanking';
import Header from '../components/Header';
import cryCat from '../cryCat.jpeg';
import catLaugh from '../catLaugh.gif';

class Feedback extends Component {
  componentDidMount = () => {
    const { name, picture, score } = this.props;
    const playerListObject = {
      playerName: name,
      playerScore: score,
      playerImage: picture,

    };
    saveRanking(playerListObject);
  }

  customMessageAssertions = (assertions) => {
    const ASSERTIONS = 3;
    if (assertions < ASSERTIONS) {
      return (
        <div className="flex flex-col justify-between justify-center h-full">
          <img className="h-15 w-15" src={ cryCat } alt="gato triste" />
          <p className="text-2xl drop-shadow-lg font-bold text-red-500" data-testid="feedback-text">Could be better...</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col justify-between justify-center h-full">
        <img className="h-15 w-15" src={ catLaugh } alt="gato triste" />
        <p className="text-2xl text-center drop-shadow-lg font-bold text-green-700" data-testid="feedback-text">Well Done!</p>
      </div>
    )
  }

  render() {
    const { assertions, name, picture, score, history } = this.props;
    return (
      <div className="bg-amber-300 h-screen flex flex-col">
        <Header userName={ name } userPicture={ picture } userScore={ score } />
        <div className="flex h-2/3 items-center justify-center">
          <main className="w-1/2 h-full flex justify-center items-center">
            <div className="w-1/2 h-80 justify-center  flex items-center">{this.customMessageAssertions(assertions)}</div>
            <section className="w-1/2 rounded-md shadow-2xl bg-zinc-400 gap-2 border-2 border-black flex flex-col items-center h-80 justify-center">
              <h5 className="text-2xl text-gray-800 font-bold">
                Score total
              </h5>
              <p
                className="font-bold mb-6 text-xl"
                data-testid="feedback-total-score"
              >
                {score}
              </p>
              <h5 className="text-2xl text-gray-800 font-bold">
                Respostas corretas
              </h5>
              <p
                data-testid="feedback-total-question"
                className="font-bold text-xl"
              >
                {assertions}
              </p>
            </section>
          </main>
        </div>

        <footer className="flex justify-center gap-8">
          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
            className=" border-2 border-black hover:-translate-y-1 transition justify-center w-28 h-10 bg-purple-400 rounded font-bold text-amber-300"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={ () => history.push('/Ranking') }
            data-testid="btn-ranking"
            className="border-2 hover:-translate-y-1 transition border-black w-28 h-10 bg-purple-400 rounded font-bold text-amber-300"
          >
            Ranking
          </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  name: state.player.name,
  picture: state.player.picture,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
