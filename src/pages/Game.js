import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveScore } from '../redux/actions';

const ascendente = 0.5;
const descendente = -1;
const responseCodeInvalid = 3;

class Game extends React.Component {
  state = {
    questions: [],
    loading: true,
    answer: [],
    timer: 30,
    isdisabled: false,
    difficulty: [],
    isVisible: false,
    questionNumber: 0,
  }

  async componentDidMount() {
    await this.getQuestions();
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  shouldComponentUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      // clearInterval(this.idtimer);
      this.setState({
        timer: 30,
        isdisabled: true,
      });
    }
    return true;
  }

  getQuestions = async () => {
    const { history } = this.props;
    const tokenLocal = await localStorage.getItem('token');
    const responseInit = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocal}`);
    const responseFetch = await responseInit.json();
    if (responseFetch.response_code === responseCodeInvalid) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const responseApi = responseFetch.results;
      const dificuldade = responseApi.map((question) => question.difficulty);
      const todasAlternativas = responseApi.map((question) => {
        const correta = { result: question.correct_answer, id: 'correct-answer' };
        const incorreta = question.incorrect_answers
          .map((item, index) => ({ result: item, id: `wrong-answer-${index}` }));
        // const alternativas =
        return ([...incorreta, correta]
          .sort(() => ((Math.random() > ascendente) ? 1 : descendente)));
      });
      this.setState({
        questions: responseApi,
        loading: false,
        answer: todasAlternativas,
        difficulty: dificuldade,
      });
    }
  }

  getGravatar = () => {
    const { userEmail } = this.props;
    const takeEmail = md5(userEmail).toString();
    const takeAvatar = `https://www.gravatar.com/avatar/${takeEmail}`;
    // console.log(takeAvatar);
    return takeAvatar;
  }

  handleAnswer = (event) => {
    const element = document.getElementById('answer-options');
    const correct = event.target.id === 'correct-answer';
    if (correct) this.setScore();
    element.childNodes.forEach((node) => {
      node.classList.add('clicked');
    });
    this.setState({
      isVisible: true,
    });
  }

  handleNextQuestion = () => {
    const NUMBER_MAX_QUESTIONS = 4;
    this.setState((prevState) => {
      if (prevState.questionNumber === NUMBER_MAX_QUESTIONS) {
        const { history } = this.props;
        return history.push('/feedback');
      }
      return ({
        questionNumber: prevState.questionNumber + 1,
        timer: 30,
      });
    });
  }

  setScore = () => {
    const { timer, difficulty, questionNumber } = this.state;
    const { dispatch, score } = this.props;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const base = 10;
    let diff = 0;
    switch (difficulty[questionNumber]) {
    case 'easy':
      diff = easy;
      break;
    case 'medium':
      diff = medium;
      break;
    case 'hard':
      diff = hard;
      break;
    default:
      diff = 0;
    }
    const total = score + (base + timer * diff);
    dispatch(saveScore(total));
  };

  render() {
    const { userName, score } = this.props;
    const {
      questions,
      loading,
      answer,
      timer,
      isdisabled,
      isVisible,
      questionNumber,
    } = this.state;
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
          <h3 data-testid="header-score">{score}</h3>
        </header>
        {loading ? <p>carregando....</p> : (
          <div>
            <h3>{timer}</h3>
            <p data-testid="question-category">{questions[questionNumber].category}</p>
            <p data-testid="question-text">{questions[questionNumber].question}</p>
            <div id="answer-options" data-testid="answer-options">
              {/* <button
                type="button"
                data-testid="correct-answer"
              >
                {questions[0].correct_answer}
              </button> */}
              {answer[questionNumber].map((element) => (
                <button
                  type="button"
                  data-testid={ element.id }
                  key={ element.id }
                  id={ element.id }
                  className={ element.id }
                  onClick={ (e) => this.handleAnswer(e) }
                  disabled={ isdisabled }
                >
                  {element.result}
                </button>))}
            </div>
            {isVisible && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNextQuestion }
              >
                Próxima Pergunta
              </button>)}
          </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Game.propTypes = {
  userName: propTypes.string.isRequired,
  userEmail: propTypes.string.isRequired,
  history: propTypes.shape().isRequired,
  score: propTypes.number.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
