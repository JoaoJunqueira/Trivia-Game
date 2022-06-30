import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  createSrcImg = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  componentDidMount = () => {
    const data = localStorage.getItem('ranking');
    const ranking = JSON.parse(data);
    this.setState({ ranking });
  }

  render() {
    const { email, name, score } = this.props;
    const index = 0;
    return (
      <div data-testid="ranking-title">
        <div>
          <img alt={ name } src={ this.createSrcImg(email) } />
          <h3 data-testid={ `player-name-${index}` }>{ name }</h3>
          <p data-testid={ `player-score-${index}` }>{ score }</p>
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToHome }
        >
          Home
        </button>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});
Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
