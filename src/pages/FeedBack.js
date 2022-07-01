import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
    this.savePlayersResult();
  }

  savePlayersResult = () => {
    const { name, score, email } = this.props;
    const localStorageData = localStorage.getItem('ranking');
    const player = {
      name, score, email,
    };
    if (!localStorageData) {
      const playerJson = JSON.stringify([player]);
      localStorage.setItem('ranking', playerJson);
    } else {
      const previousRanking = localStorage.getItem('ranking');
      const rankingOk = JSON.parse(previousRanking);
      const newRanking = [...rankingOk, player];
      const finalRanking = JSON.stringify(newRanking);
      localStorage.setItem('ranking', finalRanking);
    }
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
  email: state.player.gravatarEmail,
  name: state.player.name,
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
