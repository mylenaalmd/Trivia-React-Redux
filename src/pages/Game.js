import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  state = {
    questions: [],
    loading: true,
    answer: [],
  }

  async componentDidMount() {
    await this.getQuestions();
  }

  getQuestions = async () => {
    const { history } = this.props;
    const ascendente = 0.5;
    const descendente = -1;
    const token = localStorage.getItem('token');
    const responseFetch = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => data);
    if (responseFetch.response_code !== 0) {
      history.push('/');
    }
    const responseApi = responseFetch.results;
    const correta = { result: responseApi[0].correct_answer, id: 'correct-answer' };
    const incorreta = responseApi[0].incorrect_answers
      .map((item, index) => ({ result: item, id: `wrong-answer-${index}` }));
    const alternativas = [...incorreta, correta]
      .sort(() => ((Math.random() > ascendente) ? 1 : descendente));
    this.setState({
      questions: responseApi,
      loading: false,
      answer: alternativas,
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
    const { questions, loading, answer } = this.state;
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
              {/* <button
                type="button"
                data-testid="correct-answer"
              >
                {questions[0].correct_answer}
              </button> */}
              {answer.map((element) => (
                <button
                  type="button"
                  data-testid={ element.id }
                  key={ element.id }
                >
                  {element.result}
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
  history: propTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
