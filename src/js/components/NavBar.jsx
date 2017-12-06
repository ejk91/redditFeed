import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar.jsx';
import SearchResults from './SearchResults.jsx';
import SubscriptionFeed from './SubscriptionFeed.jsx';

import { fetchHomePosts, refreshPosts } from '../actions/postActions.js'


class NavBar extends Component {
  render() {
    return (
      <div id='navBar'> 
        <div>iReddit</div>
        <button onClick={() => this.props.fetchHomePosts()}>Home</button>
        <button onClick={() => this.props.refreshPosts(this.props.subscriptions, this.props.current)}>Refresh</button>
        <SearchBar />
        <SearchResults />
        <SubscriptionFeed />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    subscriptions: state.subredditReducer.subscriptions,
    current: state.postReducer.selectedSubreddit
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchHomePosts: () => { dispatch(fetchHomePosts())},
    refreshPosts: (subscriptions, currentSubreddit) => {dispatch(refreshPosts(subscriptions, currentSubreddit))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)