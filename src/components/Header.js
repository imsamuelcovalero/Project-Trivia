import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Cria uma classe para mostrar a Header da página
class Header extends Component {
  render() {
    const { userName, userScore, userPicture } = this.props;

    return (
      <header>
        <img data-testid="header-profile-picture" src={ userPicture } alt="Gravatar" />
        <h4 data-testid="header-player-name">
          { userName }
        </h4>
        <h4 data-testid="header-score">
          { userScore }
        </h4>
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
