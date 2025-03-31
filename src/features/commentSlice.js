import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCommentsByPost = createAsyncThunk("get/comments", async (id) => {
    const response = await fetch(`http://localhost:3000/commentByPostId/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        }
    });

    if (!response.ok) {
        console.log("Error fetching comments");
        return [];
    }
    const result = await response.json();
    // console.log(result.comment);
    return result.comment;
});

export const postComment = createAsyncThunk("post/comment", async (data) =>{
    const response = await fetch("http://localhost:3000/comment",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })

    if(!response.ok)
    {
        alert("Something went wrong")
    }
    else
    {
        // console.log("comment added")
        const newCOmment = await response.json()
        return newCOmment
    }
})



export const commentSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
        loading: false,
        error: null
    },
    reducers: {
        clearComments: (state) =>{
            state.comments = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsByPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCommentsByPost.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getCommentsByPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});


export const {clearComments} = commentSlice.actions

export default commentSlice.reducer;
