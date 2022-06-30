import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          {
            assertions < three ? <h6>Could be better...</h6> : <h6>Well Done!</h6>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
