import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./postSlice";
import { getLikedPosts, getCurrentUser } from "./userSlice";

export const likePost = createAsyncThunk(
  "like/posts",
  async (data, { dispatch }) => {
    const response = await fetch(`http://localhost:3000/likepost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Error Occurred");
    } else {
      // Refresh posts and liked posts for the user
      dispatch(getPosts(data.userId));
      dispatch(getLikedPosts(data.userId));
      dispatch(getCurrentUser(data.userId));
    }
  }
);

// const likeSlice = createSlice({
//     name: "likes",
//     initialState:{
//         likes:[],
//         error:null
//     },
//     reducers:{},
//     extraReducers: (builder) =>{

//     }
// })
