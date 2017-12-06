import obj from './actionConstants.js';
import axios from 'axios';
import { addSubredditPosts, removeSubredditPosts, fetchHomePosts } from './postActions.js';

const action = obj.subreddit;

const searchSubredditsSuccess = (data) => {
 return {
  type: action.SEARCH_SUBREDDITS_SUCCESS,
  subreddits: data
 }
}

const searchSubredditsError = (err) => {
 return {
  type: action.SEARCH_SUBREDDITS_ERROR,
  err: err
 }
}

export function searchSubreddits(query) {
  return (dispatch) => {
    axios.get(`https://www.reddit.com/subreddits/search/.json?q=${query}`)
      .then( response => {
        const subreddits = [];

        if (response.data.data) {
          response.data.data.children.map((child) => {
            subreddits.push(child.data.url);
          })
        }

        dispatch(searchSubredditsSuccess(subreddits));
      })
      .catch( err => {
        dispatch(searchSubredditsError(err));
      })
  }
}

export const subscribeSubreddit = (name, subs) => {
  return (dispatch) => {
    Promise.all([
      dispatch(addSubredditPosts(name)),
      dispatch({
        type: action.SUBSCRIBE_SUBREDDIT,
        subreddit: name
      }),
    ])
    .then(() => {
      if (subs > 0) {
        dispatch(fetchHomePosts());
      }
    })
  } 
}

export const unsubscribeSubreddit = (name) => {
  return (dispatch) => {
    Promise.all([
      dispatch(removeSubredditPosts(name)),
      dispatch({
        type: action.UNSUBSCRIBE_SUBREDDIT,
        subreddit: name
      })
    ])
    .then(() => {
      dispatch(fetchHomePosts());
    })
  } 
}