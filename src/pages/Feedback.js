import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

// req 13
const number = 3;

class Feedback extends React.Component {
  getGravatar = () => {
    const { userEmail } = this.props;
    const takeEmail = md5(userEmail).toString();
    const takeAvatar = `https://www.gravatar.com/avatar/${takeEmail}`;
    console.log(takeAvatar);
    return takeAvatar;
  }

  // req 13
   totalAssertions = () => {
     const { assertionsScore } = this.props;
     if (assertionsScore < number) {
       return 'Could be better...';
     } if (assertionsScore >= number) {
       return 'Well Done!';
     }
   }

  // req 15
  logClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  // req 16
    redirectRanking = () => {
      const { history } = this.props;
      history.push('/ranking');
    }

    render() {
    // req 12-us e 13-sc e 14-ass
      const { userName, scorePlayer, assertionsScore } = this.props;
      return (
        <header>
          <img
            src={ this.getGravatar() }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{userName}</h3>
          {/* req 12-0 e 13-{score} */}
          <h3 data-testid="header-score">{scorePlayer}</h3>
          {/* req 13 */}
          <h4 data-testid="feedback-text">
            { this.totalAssertions() }
          </h4>
          {console.log('bla', assertionsScore)}
          {console.log('bla', this.totalAssertions())}
          {/* req 14 */}
          <h2 data-testid="feedback-total-score">{scorePlayer}</h2>
          <h3 data-testid="feedback-total-question">{assertionsScore}</h3>
          {/* req 15 */}
          <button
            data-testid="btn-play-again"
            type="button"
            name="btnPlayAgain"
            onClick={ this.logClick }
          >
            Play Again
          </button>
          {/* req 16  */}
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.redirectRanking }
          >
            Ranking
          </button>
        </header>
      );
    }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  scorePlayer: state.player.score,
  assertionsScore: state.player.assertions, // req 13
});

Feedback.propTypes = {
  userName: propTypes.string.isRequired,
  userEmail: propTypes.string.isRequired,
  scorePlayer: propTypes.number.isRequired,
  assertionsScore: propTypes.number.isRequired, // req 13
  history: propTypes.shape().isRequired, // req 15
};

export default connect(mapStateToProps)(Feedback);
