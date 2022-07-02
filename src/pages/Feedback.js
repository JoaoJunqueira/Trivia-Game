import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetPlayerAction } from '../redux/actions';

class Feedback extends React.Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetPlayerAction());
  };

  goToRanking = () => {
    const { history, dispatch } = this.props;
    history.push('/ranking');
    dispatch(resetPlayerAction());
  };

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          <p>
            Your Score:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p>
            You got
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            { assertions > 1 ? 'questions right' : 'question right'}
          </p>
          {assertions < three ? (
            <h3>Could be better...</h3>
          ) : (
            <h3>Well Done!</h3>
          )}

          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
