import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { FaPlay } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { setUserPicture, addUserThunk } from '../redux/actions/index';
import logo from '../trivia.png';
import Spin from '../components/Spin';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      spin: false,
    };
  }

  handleChange = ({ target }) => {
    // console.log('entrou em handleChange');
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async (event) => {
    this.setState({ spin: true });
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
    const { email, name, spin } = this.state;
    return (
      <div
        className="flex flex-col items-center justify-center bg-purple-400 h-full"
      >
        <div className="mb-4">
          <img src={ logo } className="w-64 h-70 animate-bounce" alt="logo" />
        </div>
        <form
          className="
            min-h-40 w-80 p-4 drop-shadow-xl
            rounded flex bg-amber-300 flex-col
            border-2 border-black
          "
        >
          <input
            data-testid="input-player-name"
            className="
              m-2 p-2 border-2 focus:outline-none
              hover:border-4 rounded border-black hover:border-fuchsia-600
            "
            name="name"
            value={ name }
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <input
            className="m-2 p-2 border-2 focus:outline-none hover:border-4
            rounded border-black hover:border-fuchsia-600
            "
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            type="email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <section className="flex justify-center">
            <button
              data-testid="btn-play"
              type="button"
              className="bg-purple-400 cursor-pointer
                justify-center
                disabled:brightness-75 mb-2 p-2 w-32 border-2 border-black
                font-bold text-amber-300 rounded flex items-center gap-2
              "
              disabled={ this.isPlayButtonDisabled() }
              onClick={ this.handleSubmit }
            >
              {this.isPlayButtonDisabled() === false ? (<FaPlay />) : ''}
              Play
            </button>
          </section>
          <section className="flex justify-center">
            <button
              type="button"
              className="bg-purple-400 p-2 w-32 border-2 font-bold gap-2
                justify-center
                text-amber-300 border-black rounded flex items-center cursor-pointer
              "
              data-testid="btn-settings"
              onClick={ () => this.goToSettings() }
            >
              <FiSettings />
              Settings
            </button>
          </section>
        </form>
        <Spin isTrue={ spin } />
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
