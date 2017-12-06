import React, { Component } from 'react';
import { connect } from 'react-redux';

import { searchSubreddits } from '../actions/subredditActions.js';

class SearchBar extends Component {

  search() {
    const query = this.refs.searchQuery.value;
    this.props.searchSubreddits(query);
  }

  render() {
    return (
      <div>
        <div>
          <input id='searchInput' ref='searchQuery' type='text' onChange={() => this.search()}></input>
          <button onClick={() => this.search()}>Search</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchSubreddits: (query) => { dispatch(searchSubreddits(query))}
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)