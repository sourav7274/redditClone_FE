import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
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
  },
});

export const { updateUserActivities } = userSlice.actions;

export default userSlice.reducer;
