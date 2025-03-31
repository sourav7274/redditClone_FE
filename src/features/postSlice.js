import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("get/posts",async () =>{
    const response = await fetch("http://localhost:3000/posts");
    if(!response.ok){
        console.log("Error fetching data");
    }
    const data = await response.json();
    return data.posts;
})

export const addPost = createAsyncThunk("add/post", async (post) => {
    try {
        const response = await fetch("http://localhost:3000/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (!response.ok) {
            throw new Error("Failed to add post");
        }

        const data = await response.json();
        return data.newPost; // Return only the required part
    } catch (error) {
       console.log("Error adding post",error);
    }
});

export const getPostByID = createAsyncThunk("getPost/Id",async (id) =>{
    const response = await fetch(`http://localhost:3000/posts/${id}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    })
    if(!response.ok)
    {
        console.log("error fetching details")
    }
    const result = await response.json()
    // console.log(result.post)
    return result.post
})

export const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        status:"idle",
        error:null,
        PostDetails:[]
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getPosts.pending,(state) =>{
            state.status = "loading";
        })
        builder.addCase(getPosts.fulfilled,(state,action) =>{
            state.status = "success";
            state.posts = action.payload;
        })
        builder.addCase(getPosts.rejected,(state,action) =>{
            state.error = action.error.message;
        })
        builder.addCase(getPostByID.fulfilled,(state,action) =>{
            state.PostDetails = action.payload
        })
        builder.addCase(addPost.fulfilled,(state,action) => {
            state.posts.push(action.payload)
        })
    }
})

export default postSlice.reducer;