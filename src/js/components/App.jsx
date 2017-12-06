import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar.jsx';
import PostFeed from './PostFeed.jsx';

import { requestPosts } from '../actions/postActions.js';

class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    componentDidMount() {
      this.props.requestPosts();
    }

    render () {
      return (
        <div>
            <NavBar />
            <PostFeed />
        </div>
      )
    }

}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPosts: (query) => { dispatch(requestPosts(query))}
  }
}


const mapStateToProps = (state) => {
  return {
    ...state,
    test: state.postReducer.posts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)