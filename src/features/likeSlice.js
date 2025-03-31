import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const likePost = createAsyncThunk("like/posts",async(data) =>{
   const response = await fetch(`http://localhost:3000/likepost`,{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
   })

   if(!response.ok)
   {
    console.log("Error Occured")
   }
   else{    
    const result = await response.json()
    console.log("Liked a post",result)
   }
  
})


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