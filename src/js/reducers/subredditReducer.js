import obj from '../actions/actionConstants.js';

let constants = obj.subreddit;

let initialState = {
  subreddits: [],
  subscriptions: [],
  error: null
}

export default function subredditReducer(state = initialState, action) {

  switch(action.type) {
    case constants.SEARCH_SUBREDDITS_SUCCESS : {
      return {
        ...state,
        subreddits: action.subreddits,
      }
    }
    case constants.SUBSCRIBE_SUBREDDIT : {
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.subreddit]
      }
    }
    case constants.UNSUBSCRIBE_SUBREDDIT : {
      
      let newSubs = state.subscriptions;
      let index = newSubs.indexOf(action.subreddit);
      newSubs.splice(index, 1);

      return {
        ...state,
        subscriptions: newSubs
      }
    }
    default : {
      return {
        ...state
      }
    }

  }
}