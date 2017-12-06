import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post.jsx';
import { subscribeSubreddit, unsubscribeSubreddit } from '../actions/subredditActions.js';

class PostFeed extends Component {
  render() {
    const posts = this.props.posts.map(post => {
      return (
        <Post key={post.data.id} info={post.data}/>
      )
    })

    return (
      <div id='postFeed'> <span className='subredditTitle'>{this.props.title} </span><button onClick={() => { this.props.subscribe(this.props.title, this.props.subscriptions) }}>Subscribe</button> <button onClick={() => { this.props.unsubscribe(this.props.title)}}>Unsubscribe</button>
        {posts}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ...state,
    posts: state.postReducer.posts,
    title: state.postReducer.selectedSubreddit,
    postsBySubreddit: state.postReducer.postsBySubreddit,
    subscriptions: state.subredditReducer.subscriptions.length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (subreddit, subs) => { dispatch(subscribeSubreddit(subreddit, subs)) },
    unsubscribe: (subreddit) => { dispatch(unsubscribeSubreddit(subreddit)) },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostFeed)