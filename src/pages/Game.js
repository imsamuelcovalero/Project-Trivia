import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        <h1>Game</h1>
        <Header />
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   userLogin: (userData) => dispatch(setUserLogin(userData)),
// });

// Game.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   userLogin: PropTypes.func.isRequired,
// };

export default Game;
