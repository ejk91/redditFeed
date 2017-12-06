import obj from './actionConstants.js';
import axios from 'axios';

const action = obj;

const requestPostsSuccess = (data, query) => {
 return {
  type: action.post.REQUEST_POSTS_SUCCESS,
  posts: data,
  query: query
 }
}

const requestPostsError = (data) => {
 return {
  type: action.post.REQUEST_POSTS_ERROR,
  err: err
 }
}

export const requestPosts = (subreddit) => {
  return dispatch => {
    const query = !subreddit ? '/r/news' : `${subreddit}`;

    axios.get(`https://www.reddit.com${query}.json`)
      .then( response => {
        const data = response.data.data.children;
        dispatch(requestPostsSuccess(data, query))
      })
      .catch ( err => {
        dispatch(requestPostsError(err))
      })
  }
}

export const filterBySubreddit = (subreddit) => {
  return {
    type: action.post.FILTER_BY_SUBREDDIT,
    filter: subreddit
  }
}

export const addSubredditPosts = (subreddit) => {
  return {
    type: action.subreddit.ADD_SUBREDDIT_POSTS,
    name: subreddit
  }
}

export const removeSubredditPosts = (subreddit) => {
  return {
    type: action.subreddit.REMOVE_SUBREDDIT_POSTS,
    name: subreddit
  }
}

export const fetchHomePosts = () => {
  return {
    type: action.post.FETCH_HOME_SUBREDDIT_POSTS
  }
}

export const refreshPosts = (subscriptions, currentSubreddit) => {
  const postsBySubreddit = {};

  return (dispatch) => {
    if (subscriptions.length === 0) {
      dispatch(requestPosts(currentSubreddit));
    } else {
      const urls = subscriptions.map((sub)=> {
        return axios.get(`https://www.reddit.com${sub}.json`)
          .then(response => {
            return {
              subreddit: sub,
              data: response.data.data.children
            }
          })
      })

      axios.all(urls)
        .then(axios.spread((...args) => {
          for (let i = 0; i < args.length; i++) {
            postsBySubreddit[args[i].subreddit] = args[i].data;
          }
        }))

      dispatch({
        type: action.post.REFRESH_POSTS,
        postsBySubreddit: postsBySubreddit
      })

    }
  }

}

