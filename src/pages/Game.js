import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  getGravatar = () => {
    const { userEmail } = this.props;
    const takeEmail = md5(userEmail).toString();
    const takeAvatar = `https://www.gravatar.com/avatar/${takeEmail}`;
    console.log(takeAvatar);
    return takeAvatar;
  }

  render() {
    const { userName } = this.props;
    return (
      <header>
        {console.log(this.getGravatar())}
        <img
          src={ this.getGravatar() }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{userName}</h3>
        <h3 data-testid="header-score">0</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.exampleReducer.name,
  userEmail: state.exampleReducer.gravatarEmail,
});

Game.propTypes = {
  userName: propTypes.string.isRequired,
  userEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
