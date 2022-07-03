import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <header>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <section>
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
};
export default Ranking;
