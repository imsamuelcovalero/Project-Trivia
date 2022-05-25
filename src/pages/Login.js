import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserLogin } from '../redux/actions';
import getToken from '../helpers/tokenAPI';
import userToken from '../helpers/saveToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
  }

  handleChange = ({ target }) => {
    // console.log('entrou em handleChange');
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async (event) => {
    const { history, userLogin } = this.props;
    event.preventDefault();
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (userData) => dispatch(setUserLogin(userData)),
  // userToken: (token) => dispatch(setUserToken(token)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
  // userToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
