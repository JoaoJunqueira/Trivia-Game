import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div data-testid="ranking-title">
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
