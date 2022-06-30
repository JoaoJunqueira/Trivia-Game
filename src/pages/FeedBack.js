import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          {
            assertions < three ? <h6>Could be better...</h6> : <h6>Well Done!</h6>
          }

          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.handleClick }
          >
            Play Again
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

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps)(FeedBack);
