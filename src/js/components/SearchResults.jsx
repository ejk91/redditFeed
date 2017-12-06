import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestPosts } from '../actions/postActions.js';
import { searchSubreddits } from '../actions/subredditActions.js';

class SearchResults extends Component {

  requestSubredditPosts(url) {
    this.props.searchSubreddits('');
    this.props.requestPosts(url);
  }

  render() {
    const results = this.props.searchResults.map(result => {
      return (
        <li key={result} onClick={() => this.requestSubredditPosts(result)}>
          {result}
        </li>
      )
    })
    
    return (
      <div> 
      <ul>
        {results}
      </ul>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ...state,
    searchResults: state.subredditReducer.subreddits
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPosts: (query) => { dispatch(requestPosts(query))},
    searchSubreddits: (query) => { dispatch(searchSubreddits(query))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)