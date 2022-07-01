import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  getGravatar = () => {
    const { userEmail } = this.props;
    const takeEmail = md5(userEmail).toString();
    const takeAvatar = `https://www.gravatar.com/avatar/${takeEmail}`;
    console.log(takeAvatar);
    return takeAvatar;
  }

  render() {
    const { userName, score } = this.props;
    return (
      <header className="App-header">
        <h1 data-testid="feedback-text">FEEDBACK</h1>
        <img
          src={ this.getGravatar() }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{userName}</h3>
        <h3 data-testid="header-score">{score}</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Feedback.propTypes = {
  userName: propTypes.string.isRequired,
  userEmail: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
