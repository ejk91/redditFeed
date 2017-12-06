import obj from '../actions/actionConstants.js';

let constants = obj;

let initialState = {
  posts: [],
  postsBySubreddit: {},
  selectedSubreddit: '',
  fetching: false,
  error: null
}

export default function postReducer(state = initialState, action) {

  switch(action.type) {
    case constants.post.REQUEST_POSTS : {
      return {
        ...state,
        fetching: true
      }
    }
    case constants.post.REQUEST_POSTS_SUCCESS : {
      const newPosts = action.posts;
      return {
        ...state,
        fetching: false,
        posts: newPosts,
        selectedSubreddit: action.query
      }
    }
    case constants.post.FILTER_BY_SUBREDDIT : {
      return {
        ...state,
        selectedSubreddit: action.filter,
        posts: state.postsBySubreddit[action.filter]
      }
    }
    case constants.subreddit.ADD_SUBREDDIT_POSTS : {
      const newPosts = state.postsBySubreddit;
      newPosts[action.name] = state.posts;
      return {
        ...state,
        postsBySubreddit: newPosts
      }
    }
    case constants.subreddit.REMOVE_SUBREDDIT_POSTS : {
      const newPosts = state.postsBySubreddit;
      delete newPosts[action.name];
      return {
        ...state,
        postsBySubreddit: newPosts
      }
    }
    case constants.post.FETCH_HOME_SUBREDDIT_POSTS : {
      if (Object.keys(state.postsBySubreddit).length === 0) {
        return {
          ...state
        }
      }

      let allPosts = [];

      for(let key in state.postsBySubreddit) {
        allPosts = allPosts.concat(state.postsBySubreddit[key])
      }

      return {
        ...state,
        posts: sortPostsByUpvotes(allPosts),
        selectedSubreddit: 'Home'
      }
    }
    case constants.post.REFRESH_POSTS : {
      return {
        ...state,
        postsBySubreddit: action.postsBySubreddit
      }
    }
    default : {
      return {
        ...state
      }
    }

  }
}

const sortPostsByUpvotes = (posts) => {
  return posts.sort((a,b) => {
    return b.data.ups - a.data.ups
  })
}