import React, { Component } from 'react';
import { connect } from 'react-redux';

import { filterBySubreddit } from '../actions/postActions.js';

class SubscriptionFeed extends Component {
  
  render() {
    const subscriptions = this.props.subscriptions.map(child => {
      return (
        <li key={child} onClick={() =>{this.props.filterBySubreddit(child)}}>
        {child}
        </li>
      )
    })

    return (
      <div> 
      My Subscriptions:
      {subscriptions}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    subscriptions: state.subredditReducer.subscriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterBySubreddit: (subreddit) => { dispatch(filterBySubreddit(subreddit))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionFeed)