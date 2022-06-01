/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getRanking from '../helpers/getRanking';
import trofeu2 from '../trofeu2.png';
import cat from '../cat.jpeg';

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
      <div className="bg-purple-400 h-screen flex justify-center gap-8 items-center">
        <div className="w-[500px] animate-bounce ">
          <img src={ trofeu2 } className="w-full h-[300px]" alt="trofeu" />
        </div>
        <div className="flex flex-col w-2/3 mr-20 items-center gap-4">
          <h1 data-testid="ranking-title" className="text-4xl font-bold">Ranking</h1>
          <div className="flex justify-center items-center border-t-2 border-r-2 border-l-2 border-black rounded">
            <table>
              <tr className="w-full bg-amber-300">
                <th className="w-40">Profile</th>
                <th className="w-40">Player</th>
                <th className="w-40">Score</th>
              </tr>
              { playerList.map((player = 'player', index) => (
                <tr key={ index } className="border-b-2 bg-zinc-200 border-black">
                  <td className="p-2 flex justify-center ">
                    <img className="h-8 w-8 text-center rounded border-2 border-white" src={ player.playerImage } alt="player" />
                  </td>
                  <td data-testid={ `player-name-${index}` } className="text-center">
                    {player.playerName}
                  </td>
                  <td data-testid={ `player-score-${index}` } className="text-center">
                    {player.playerScore}
                  </td>
                </tr>
              )) }
            </table>
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.homeButton }
            className="p-2 w-28 bg-amber-300 border-2 border-black rounded font-bold text-gray-800"
          >
            Home
          </button>
        </div>
        <div className="mr-16">
          <img src={ cat } className="mr-20" alt="cat" />
        </div>
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
