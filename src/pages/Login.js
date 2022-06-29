import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayerInfoAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    button: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateButton);
  };

  validateButton = () => {
    const { name, email } = this.state;

    // Referência: Aula do Fernando sobre Regex
    const regex = /^(\w|\.)+@[a-z]+\.com$/gm;

    const isEmailOk = email.match(regex);

    if (name.length !== 0 && isEmailOk) {
      return this.setState({ button: false });
    }
    return this.setState({ button: true });
  };

  handleClickPlay = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;

    const api = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const res = await api.json();

    localStorage.setItem('token', res.token);

    history.push('/game');

    dispatch(addPlayerInfoAction(name, email));
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { button, name, email } = this.state;
    return (
      <div>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            data-testid="input-player-name"
            name="name"
            placeholder="Name"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            placeholder="E-mail"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ button }
          onClick={ this.handleClickPlay }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClickSettings }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
