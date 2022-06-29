import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    results: [],
    index: 0,
    answers: [],
    sortIndex: [],
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

  render() {
    const { results, index, sortIndex, answers } = this.state;
    const rightAnswer = answers[0];

    return (
      <div>
        <Header />
        {results.length > 0 && (
          <div>
            <h1>Trivia</h1>
            <h2 data-testid="question-text">{results[index].question}</h2>
            <h3 data-testid="question-category">{results[index].category}</h3>
            <div data-testid="answer-options">
              {sortIndex.map((ind, i) => (answers[ind] === rightAnswer ? (
                <button data-testid="correct-answer" key={ i } type="button">
                  {answers[ind]}
                </button>
              ) : (
                <button
                  data-testid={ `wrong-answer-${i}` }
                  key={ i }
                  type="button"
                >
                  {answers[ind]}
                </button>
              )))}
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
