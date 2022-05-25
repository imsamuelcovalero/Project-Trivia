import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setUserPicture, addUserThunk } from '../redux/actions/index';

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
    const { history, userThunk, userPicture } = this.props;
    const { email } = this.state;
    event.preventDefault();
    const encode = md5(email).toString();
    const imgGravatar = `https://www.gravatar.com/avatar/${encode}`;
    userPicture(imgGravatar);
    await userThunk(this.state);
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
  userThunk: (userData) => dispatch(addUserThunk(userData)),
  userPicture: (pictureUrl) => dispatch(setUserPicture(pictureUrl)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userThunk: PropTypes.func.isRequired,
  userPicture: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
