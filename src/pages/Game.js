import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    results: [],
    index: 0,
    answers: [],
    sortIndex: [],
    answersResult: false,
    timer: 30,
    isButtonDisabled: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { index } = this.state;
    const token = localStorage.getItem('token');

    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const data = await response.json();

    if (data.response_code === 0) {
      this.setState({
        results: data.results,
        answers: [
          data.results[index].correct_answer,
          ...data.results[index].incorrect_answers,
        ],
      });
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.shuffleArray();
    this.countdownTimer();
  }

  shuffleArray = () => {
    const { answers } = this.state;
    const num = 0.5;
    const array = [];

    for (let i = 0; i < answers.length; i += 1) {
      array.push(i);
    }

    // Referência: https://flaviocopes.com/how-to-shuffle-array-javascript/
    const sortIndex = array.sort(() => Math.random() - num);

    this.setState({ sortIndex });
  };

  handleClick = () => {
    this.setState({ answersResult: true, isButtonDisabled: true });
  };

  handleClickNext = () => {
    const { results, index } = this.state;
    const { history } = this.props;

    this.setState(
      (prevState) => ({
        index: prevState.index + 1,
        answers: [
          results[prevState.index + 1].correct_answer,
          ...results[prevState.index + 1].incorrect_answers,
        ],
        answersResult: false,
        timer: 30,
        isButtonDisabled: false,
      }),
      this.shuffleArray,
    );

    const quatro = 4;
    if (index >= quatro) {
      history.push('/feedback');
    }
  };

  countdownTimer = () => {
    const ONE_SECOND = 1000;

    setInterval(
      () => this.setState(
        (prevState) => ({
          timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
        }),
        () => {
          const { timer } = this.state;
          if (timer === 0) {
            this.setState({
              isButtonDisabled: true,
              answersResult: true,
            });
          }
        },
      ),
      ONE_SECOND,
    );
  };

  render() {
    const {
      results,
      index,
      sortIndex,
      answers,
      answersResult,
      isButtonDisabled,
      timer,
    } = this.state;
    const rightAnswer = answers[0];

    return (
      <div>
        <Header />
        {results.length > 0 && (
          <div>
            <h1>Trivia</h1>
            <p>{timer}</p>
            <h2 data-testid="question-text">{results[index].question}</h2>
            <h3 data-testid="question-category">{results[index].category}</h3>
            <div data-testid="answer-options">
              {sortIndex.map((ind, i) => (answers[ind] === rightAnswer ? (
                <button
                  data-testid="correct-answer"
                  key={ i }
                  type="button"
                  onClick={ this.handleClick }
                  className={ answersResult ? 'green-border' : '' }
                  disabled={ isButtonDisabled }
                >
                  {answers[ind]}
                </button>
              ) : (
                <button
                  data-testid={ `wrong-answer-${i}` }
                  key={ i }
                  type="button"
                  onClick={ this.handleClick }
                  className={ answersResult ? 'red-border' : '' }
                  disabled={ isButtonDisabled }
                >
                  {answers[ind]}
                </button>
              )))}
              {answersResult && (
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ this.handleClickNext }
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
