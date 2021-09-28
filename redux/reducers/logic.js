import * as constants from "../constants/index";

const initialState = {
    currentUser: null,
    posts: [],
    followers: [],
    followersData: [],
    following: [],
    followingData: [],
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case constants.CURRENT_USER_DATA_LOADED:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case constants.USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts,
            }
        case constants.USER_FOLLOWERS_STATE_CHANGE:
            return {
                ...state,
                followers: action.followers
            }
        case constants.USER_FOLLOWERS_LOAD_DATA:
            return {
                ...state,
                followersData: [
                    ...state.followersData,
                    action.userData
                ]
            }
        case constants.USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                following: action.following
            }
        case constants.USER_FOLLOWING_LOAD_DATA:
            return {
                ...state,
                followingData: [
                    ...state.followingData,
                    action.userData
                ]
            }
        case constants.CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}