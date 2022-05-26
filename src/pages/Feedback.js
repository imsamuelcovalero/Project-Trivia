import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  customMessageAssertions = (assertions) => {
    const ASSERTIONS = 3;
    if (assertions < ASSERTIONS) {
      return <p data-testid="feedback-text">Could be better...</p>;
    }
    return <p data-testid="feedback-text">Well Done!</p>;
  }

  render() {
    const { assertions, name, picture, score, history } = this.props;
    return (
      <div>
        <header>
          <img
            src={ picture }
            alt={ name }
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>

        <main>
          <div>{this.customMessageAssertions(assertions)}</div>
          <div>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{assertions}</p>
          </div>
        </main>

        <footer>
          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={ () => history.push('/Ranking') }
            data-testid="btn-ranking"
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
