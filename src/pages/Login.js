import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setUserLogin } from '../redux/actions';
import saveRanking from '../helpers/saveRanking';

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

  handleSubmit = (event) => {
    const { history, userLogin } = this.props;
    event.preventDefault();
    const { email } = this.state;
    console.log('userEmail', email);
    const hash = md5(email).toString();
    console.log('hash', hash);
    const imgGravatar = `https://www.gravatar.com/avatar/${hash}`;
    console.log('imgGravatar', imgGravatar);
    saveRanking(imgGravatar);
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
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
