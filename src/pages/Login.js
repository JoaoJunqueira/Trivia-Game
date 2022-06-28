import React from 'react';

class Login extends React.Component {
  state={
    name: '',
    email: '',
    button: true,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateButton);
  }

  validateButton = () => {
    const { name, email } = this.state;
    if (name.length !== 0 && email.length !== 0) {
      return this.setState({ button: false });
    }
    return this.setState({ button: true });
  }

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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
