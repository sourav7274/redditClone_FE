import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk("add/User", async (user) => {
  const response = await fetch("http://localhost:3000/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    console.log("Error adding user");
  }
  const data = await response.json();
  return data;
});

const storedUser = sessionStorage.getItem("user");

export const loginUser = createAsyncThunk("login/User", async (user) => {
  const response = await fetch("http://localhost:3000/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    if (response.status === 404) return alert("User not found");
    else if (response.status === 401)
      return alert("Invalid password Or Email ID");
    else console.log("Error logging in", response);
  } else {
    const data = await response.json();
    sessionStorage.setItem("user", JSON.stringify(data.user));
    // console.log(data);
    return data.user;
  }
});

export const getUser = createAsyncThunk("get/User", async () => {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    console.log("Error fetching data");
  }
  const data = await response.json();
  return data.user;
});

export const getCurrentUser = createAsyncThunk(
  "get/currentUSer",
  async (id) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Error fetching data");
    }
    const data = await response.json();
    sessionStorage.setItem("user", JSON.stringify(data.user));
    // console.log("function called",data)
    return data.user;
  }
);

export const getOtherUSers = createAsyncThunk("get/otherUsers", async (id) => {
  const { data } = await axios.get("http://localhost:3000/otherUsers", {
    params: { id },
  });
  return data;
});

export const getLikedPosts = createAsyncThunk("get/likedPosts",async (id ) =>{
  const response = await axios.get(`http://localhost:3000/user/${id}/like-posts`)
  return response?.data?.likedPostIds
}) 

export const updateUser  = createAsyncThunk("update/user",async ({data,id}) =>{
  const response = await axios.put(`http://localhost:3000/user/${id}/updateDetails`,data)
  return response.status
})

export const addFriend = createAsyncThunk("add/friend",async ({sendingUserId,recievingUserId,note=""}) => {
  const response = await axios.post(`http://localhost:3000/friend-request`,{sendingUserId,recievingUserId,note})
  // console.log(response.data)
})

export const fetchSentRequests = createAsyncThunk("get/sent-requests",async (id) => {
  const response = await axios.get(`http://localhost:3000/sent-friend-requests/${id}`)
  console.log(response.data.requests)
  let requestArray = response.data.requests.reduce((acc,curr) => {
    acc.push(curr.recievingUserId)
    return acc
  } , [])
  return requestArray
})

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: storedUser ? JSON.parse(storedUser) : null,
    likedPosts:[],
    otherUser: [],
    sentRequest: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateUserActivities: (state, action) => {
      if (state.currentUser) {
        const { type, data } = action.payload;
        if (type === "post") {
          state.currentUser.posts = [...state.currentUser.posts, data];
        } else if (type === "comment") {
          state.currentUser.comments = [...state.currentUser.comments, data];
        } else if (type === "like") {
          state.currentUser.likedPosts = [
            ...state.currentUser.likedPosts,
            data,
          ];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getOtherUSers.fulfilled, (state, action) => {
      state.otherUser = action.payload;
    });
    builder.addCase(getLikedPosts.fulfilled,(state,action) =>{
      state.likedPosts = action.payload
    })
    builder.addCase(fetchSentRequests.fulfilled,(state,action) =>{
      state.sentRequest = action.payload
    })
  },
});

export const { updateUserActivities } = userSlice.actions;

export default userSlice.reducer;
