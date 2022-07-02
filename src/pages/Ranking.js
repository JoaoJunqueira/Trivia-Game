import React from 'react';
import PropTypes from 'prop-types';
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

    // Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const newRanking = ranking.sort((a, b) => {
      const num = -1;
      if (a.score > b.score) {
        return num;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });
    this.setState({ ranking: newRanking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div data-testid="ranking-title">
        <div>
          {
            ranking.map((item, index) => (
              <div key={ index }>
                <img alt={ item.name } src={ this.createSrcImg(item.email) } />
                <h3 data-testid={ `player-name-${index}` }>{ item.name }</h3>
                <p data-testid={ `player-score-${index}` }>{ `Score: ${item.score}` }</p>
              </div>
            ))
          }
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

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Ranking;
