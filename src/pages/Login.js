import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { login } from '../redux/actions';

const minNum = 0;
// const validEmail = /^[\w]+@[\w]+\.[a-z]/;

class Login extends React.Component {
    state = {
      email: '',
      name: '',
      buttonDisabled: true,
    }

      enableButton = () => {
        const { name, email } = this.state;
        if (name.length > minNum && email.length > minNum) {
          this.setState({ buttonDisabled: false });
        } else {
          this.setState({ buttonDisabled: true });
        }
      }

      handleChange= ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value }, this.enableButton);
      };

      logClick = () => {
        const { loginUser } = this.props;
        const { name, email } = this.state;
        loginUser(name, email);
        // history.push('/carteira');
      }

      render() {
        const { name, email, buttonDisabled } = this.state;
        return (
          <div>
            <header className="App-header">
              <img src={ logo } className="App-logo" alt="logo" />
              <p>SUA VEZ AGORA</p>
            </header>
            <form>
              <label htmlFor="name">
                <input
                  data-testid="input-player-name"
                  type="text"
                  name="name"
                  placeholder="Digite o nome"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                <input
                  data-testid="input-gravatar-email"
                  type="email"
                  name="email"
                  placeholder="Digite o email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="btn-play"
                type="button"
                name="btn"
                onClick={ this.logClick }
                disabled={ buttonDisabled }
              >
                Entrar
              </button>
            </form>
          </div>
        );
      }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (name, gravatarEmail) => dispatch(login(name, gravatarEmail)),
});
Login.propTypes = {
//   history: propTypes.shape().isRequired,
  loginUser: propTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
