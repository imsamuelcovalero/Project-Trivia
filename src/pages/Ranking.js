import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getRanking from '../helpers/getRanking';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      playerList: [],
    };
  }

  componentDidMount = () => {
    const restoredRanking = getRanking();
    restoredRanking.sort((a, b) => (
      (b.playerScore) - (a.playerScore)
    ));

    this.setState({ playerList: restoredRanking });
  }

  homeButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { playerList } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { playerList.map((player, index) => (
            <li key={ index }>
              <img src={ player.playerImage } alt="player" />
              <p data-testid={ `player-name-${index}` }>
                { player.playerName }
              </p>
              <p data-testid={ `player-score-${index}` }>
                { player.playerScore }
              </p>
            </li>
          )) }

        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.homeButton }
        >
          Home
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    playerName: state.player.name,
    playerScore: state.player.score,
    playerImage: state.player.picture,
  };
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
/*   playerName: PropTypes.oneOfType([PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)]).isRequired,
  playerScore: PropTypes.oneOfType([PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)]).isRequired,
  playerImage: PropTypes.oneOfType([PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)]).isRequired, */
};

export default connect(mapStateToProps, null)(Ranking);
