import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';

// Cria uma classe para mostrar a Header da página
class Header extends Component {
  render() {
    const { userName, userScore, userPicture } = this.props;

    return (
      <header className="flex bg-purple-400 h-20">
        <section className="w-2/3 ml-2">
          <div className="mb-4 flex items-center h-full">
            <img src={ logo } className="w-20 h-15 animate-bounce" alt="logo" />
          </div>
        </section>
        <section className="flex gap-8 flex-1 justify-center items-center">
          <img
            className="h-12 w-12 rounded-md border-2 border-white"
            data-testid="header-profile-picture"
            src={ userPicture }
            alt="Gravatar"
          />
          <h4
            className="font-bold text-amber-300 md:text-lg"
            data-testid="header-player-name"
          >
            { `Nome: ${userName}` }
          </h4>
          <h3
            data-testid="header-score"
            className="font-bold text-amber-300 md:text-lg"
          >
            {`Score: ${userScore}` }
          </h3>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userName: globalState.player.name,
  userPicture: globalState.player.picture,
  userScore: globalState.player.score,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userPicture: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
