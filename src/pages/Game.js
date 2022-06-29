import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  state = {
    questions: [],
    loading: true,
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const token = localStorage.getItem('token');
    const responseApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => data.results);
    console.log(responseApi);
    this.setState({
      questions: responseApi,
      loading: false,
    });
  }

  getGravatar = () => {
    const { userEmail } = this.props;
    const takeEmail = md5(userEmail).toString();
    const takeAvatar = `https://www.gravatar.com/avatar/${takeEmail}`;
    // console.log(takeAvatar);
    return takeAvatar;
  }

  render() {
    const { userName } = this.props;
    const { questions, loading } = this.state;
    // console.log(questions);
    return (
      <div>

        <header>
          {/* {console.log(this.getGravatar())} */}
          <img
            src={ this.getGravatar() }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{userName}</h3>
          <h3 data-testid="header-score">0</h3>
        </header>
        {loading ? <p>carregando....</p> : (
          <div>
            <p data-testid="question-category">{questions[0].category}</p>
            <p data-testid="question-text">{questions[0].question}</p>
            <div data-testid="answer-options">
              <button
                type="button"
                data-testid="correct-answer"
              >
                {questions[0].correct_answer}
              </button>
              {questions[0].incorrect_answers.map((element, index) => (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  key={ element }
                >
                  {element}
                </button>))}
            </div>
          </div>)}
      </div>
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
