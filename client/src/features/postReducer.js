// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     posts: [],
// }

// export const postSlice = createSlice({
//     name: "post",
//     initialState,
//     reducers: {
//         setPosts: (state, action) => {
//             state.posts = action.payload.posts;
//         },
//         updatePost: (state, action) => {
//             const updatedPosts = state.posts.map((post) => {
//                 if (post._id === action.payload.post._id) return action.payload.post;
//                 return post;
//             });
//             state.posts = updatedPosts;
//         }
//     }
// });

// export const { setPosts, updatePost } = postSlice.actions;
// export default postSlice.reducer;