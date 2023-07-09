import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFollowings: (state, action) => {
            // only allowed if authorized
            if (state.user) {
                state.user.followings = action.payload.followings;
            }
        },
        // updateFollowing
        // setFolloweres
        // updateFollower

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        updatePost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    }
});

// export const { setLogin, setLogout, setFollowings } = authSlice.actions;
export const { setLogin, setLogout, setFollowings, setPosts, updatePost } = authSlice.actions;

export default authSlice.reducer;