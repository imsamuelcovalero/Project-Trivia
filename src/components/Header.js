import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';
import getRanking from '../helpers/getRanking';

// Cria uma classe para mostrar a Header da página
class Header extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     profilePicture: '',
  //   };
  // }

  // componentDidMount = () => {
  //   // const { userEmail } = this.props;
  //   // console.log('userEmail', userEmail);
  //   // const hash = md5(userEmail).toString();
  //   // console.log('hash', hash);
  //   // const imgGravatar = `https://www.gravatar.com/avatar/${hash}`;
  //   // console.log('imgGravatar', imgGravatar);
  //   const ranking = getRanking();
  //   const profilePicture = ranking.picture;
  //   this.setState({
  //     profilePicture: imgGravatar,
  //   });
  // }

  render() {
    // const { profilePicture } = this.state;
    const { userName, userScore } = this.props;

    const ranking = getRanking();
    console.log('ranking', ranking);
    const profilePicture = ranking[0].picture;
    console.log('profilePicture', profilePicture);

    return (
      <header>
        <img data-testid="header-profile-picture" src={ profilePicture } alt="Gravatar" />
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
  // userEmail: globalState.player.email,
  userScore: globalState.player.score,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  // userEmail: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
