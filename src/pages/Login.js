import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setUserLogin, setUserPicture } from '../redux/actions';
import getToken from '../helpers/tokenApi';
import userToken from '../helpers/saveToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    // console.log('entrou em handleChange');
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async (event) => {
    const { history, userLogin, userPicture } = this.props;
    const { email } = this.state;
    event.preventDefault();
    const hash = md5(email).toString();
    const imgGravatar = `https://www.gravatar.com/avatar/${hash}`;
    userPicture(imgGravatar);
    const newToken = await getToken();
    const { token } = newToken;
    userToken(token);
    userLogin(this.state);
    history.push('/Game');
  }

  isPlayButtonDisabled = () => {
    const { email, name } = this.state;
    if (email.includes('@') && email.includes('.com') && name.length > 0) {
      return false;
    }
    return true;
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('/Settings');
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            data-testid="input-player-name"
            name="name"
            value={ name }
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            type="email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.isPlayButtonDisabled() }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.goToSettings() }
        >
          Settings
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (userData) => dispatch(setUserLogin(userData)),
  userPicture: (pictureUrl) => dispatch(setUserPicture(pictureUrl)),
  // userToken: (token) => dispatch(setUserToken(token)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
  userPicture: PropTypes.func.isRequired,
  // userToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
