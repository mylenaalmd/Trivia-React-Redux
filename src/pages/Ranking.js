import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetGame } from '../redux/actions';

class Ranking extends React.Component {
  redirectLogin = () => {
    const { history, dispatch } = this.props;
    dispatch(resetGame());
    history.push('/');
  }

  getGravatar = (foto) => {
    // const { userEmail } = this.props;
    const takeEmail = md5(foto).toString();
    const takeAvatar = `https://www.gravatar.com/avatar/${takeEmail}`;
    // console.log(takeAvatar);
    return takeAvatar;
  }

  render() {
    const { userName, scorePlayer, userEmail } = this.props;
    const jogadoresAntigos = JSON.parse(localStorage.getItem('ranking'));
    console.log('jogadores antigos', jogadoresAntigos);
    let rankingOrdenado;
    if (jogadoresAntigos === null) {
      rankingOrdenado = [{ name: userName, score: scorePlayer, picture: userEmail }];
    } else {
      const enviarProStorage = [...jogadoresAntigos,
        { name: userName, score: scorePlayer, picture: userEmail }];
      console.log('enviar pro storage', enviarProStorage);
      rankingOrdenado = enviarProStorage
        .sort((obj1, obj2) => obj2.score - obj1.score);
      console.log('ranking ordenado', rankingOrdenado);
    }
    localStorage.setItem('ranking', JSON.stringify(rankingOrdenado));
    return (
      <div>
        <header>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <section>
          {rankingOrdenado.map((player, index) => (
            <div key={ index }>
              <img
                src={ this.getGravatar(player.picture) }
                alt="gravatar"
              />
              <p
                data-testid={ `player-name-${index}` }
              >
                {player.name}

              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                {player.score}

              </p>
            </div>))}
          <button
            data-testid="btn-go-home"
            type="button"
            name="btn-go-home"
            onClick={ this.redirectLogin }
          >
            Login
          </button>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape().isRequired,
  dispatch: propTypes.func.isRequired,
  userName: propTypes.string.isRequired,
  userEmail: propTypes.string.isRequired,
  scorePlayer: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  scorePlayer: state.player.score,
});
export default connect(mapStateToProps)(Ranking);
