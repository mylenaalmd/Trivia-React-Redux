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
      buttonEnable: false,
    };

      enableButton = () => {
        const { name, email } = this.state;
        if (name.length > minNum && email.length > minNum) {
          this.setState({ buttonDisabled: false });
        } else {
          this.setState({ buttonDisabled: true });
        }
      };

      handleChange= ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value }, this.enableButton);
      };

      requestApi = async () => {
        const responseApi = await fetch('https://opentdb.com/api_token.php?command=request')
          .then((response) => response.json())
          .then((data) => data);
        localStorage.setItem('token', responseApi.token);
      };

      logClick = async () => {
        const { history, loginUser } = this.props;
        const { name, email } = this.state;
        loginUser(name, email);
        await this.requestApi();
        history.push('/game');
      };

      logClickSet = () => {
        const { history } = this.props;
        history.push('/settings');
      };

      render() {
        const { name, email, buttonDisabled, buttonEnable } = this.state;
        return (
          <div className="App-header">
            <div>
              <img src={ logo } className="App-logo" alt="logo" />
              <p>SUA VEZ AGORA</p>
            </div>
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
                Play
              </button>
              <button
                data-testid="btn-settings"
                type="button"
                name="btnSettings"
                onClick={ this.logClickSet }
                disabled={ buttonEnable }
              >
                Settings
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
  history: propTypes.shape().isRequired,
  loginUser: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
