
import Footer from "../components/Footer";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addPost,  getPosts } from "../features/postSlice";
// import { getUser } from "../features/userSlice";
import { Avatar } from "@material-tailwind/react";
// import like_button from '../images/like_button.png'
import comment from '../images/comment.png'
import { Form, Link, useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { postComment } from "../features/commentSlice";
import { getCommentsByPost } from "../features/commentSlice";
import { clearComments } from "../features/commentSlice";
import { likePost } from "../features/likeSlice";

import axios from "axios";


const UserLanding = () => {
  const dispatch = useDispatch()
  const [commentId,setCommentId] = useState("")
  const [commentDetails,setDetails] = useState("")
  const [selectedFileName,setFileName] = useState("")
  const {posts} = useSelector(state => state.post)
  const currentUser = useSelector(state => state.user.currentUser)
  const currentPostComments = useSelector(state => state.comments.comments)
  const [file,setFile] = useState(null)
  const [newPost,setPost] = useState({
      title:"",
      author: currentUser ? currentUser._id : ""  ,
      imgUrl: null,
      description:""
  })


  const handlePostCreator = (e) =>{
    const {name,value} = e.target
    // console.log(name,value)
    // console.log(e.target.name,e.target.value)
    
   setPost((pval) => ({
    ...pval,
    [name]: value
   }))

    // console.log(newPost)
  }

  // console.log(currentUser)
  // console.log(currentPostComments)


  const navigate = useNavigate()
  const[openDropdown,setOpenDropdown] = useState({
    activity:false,
    comments:false,
    posts:false
  })

  const toggleDropdown = (menu) =>{
    setOpenDropdown((pval) => ({
      ...pval,[menu] : !pval[menu]
    }))
  }

  useEffect(() =>{
    dispatch(getPosts())
  },[])

  // console.log(posts[0])
  // console.log(currentUser)
  const handleCommentSubmit = (id) =>{
    // console.log(commentDetails,id,currentUser._id)
    const newComment = {
      postId: id,
      userId: currentUser ? currentUser._id : "",
      content: commentDetails
    }
    if(newComment.content != "" && newComment.userId != "")
    {
      dispatch(postComment(newComment))
    }
   else
   {
    alert("Sign In before commenting")
   }

    setDetails("")
    setCommentId("")
  }

  const togglePosts = (id) => {
    if (commentId === id) {
      setCommentId(""); 
      dispatch(clearComments());
    } else {
      setCommentId(id); 
   dispatch(getCommentsByPost(id)); 
    }
  };

  const likeHandler = (id) =>{
     const newLike = {
      postId:id,
      userId:currentUser._id
     }
    //  console.log(newLike)
     dispatch(likePost(newLike))

  }

  // const handleImageUpload = (e) => {
  //  setFile(e.target.files[0])
  // };

// const handleFileChange = (e) => {
//   console.log(e.target.files[0])
//   setFile(e.target.files[0]);
//   // console.log(file)
// }

const handlePostSubmit = async () => {
    if (newPost.author.trim() !== "") {

      const formData = new FormData()
      formData.append('file',file)
      formData.append("upload_preset", "ml_default");
        try {
          
          const fileResponse = await axios.post( "https://api.cloudinary.com/v1_1/dqqfauejn/image/upload",
            formData,
            {headers: {
              "Content-Type" : 'multipart/form-data'
            }}
          )

          if(fileResponse.status != 200)
          {
            console.log("Some Error Occured",file)
          }
          const fileUrl = await fileResponse.data.url
          console.log(fileUrl)
          if(fileUrl)
          {
            const updatedPost = {...newPost,imgUrl:fileUrl}
            dispatch(addPost(updatedPost))
            setPost({
            title: "",
            author: currentUser ? currentUser._id : "",
            description: "",
            imgUrl: null,
            });
            dispatch(getPosts());
          }
        }
        catch(err){
          console.log("Error uploading image",err);
        }
      }   
     else {
        alert("Sign in before posting");
    }
  }

  // console.log(posts)

  const handleFileChange = (e) =>{
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }
  

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-grow  text-white bg-redditBlack">
        <div className="grid grid-cols-4">
        <div className="bg-redditBlack text-white p-4">
     
      <h3> {currentUser && currentUser.name ? <><p>Welcome {currentUser.name}</p></> :<><p>Please Sign In</p></>}  </h3> 
      <div className="relative flex h-[calc(100vh-2rem)] w-full max-w-[20rem] flex-col rounded-xl bg-clip-border shadow-xl shadow-blue-gray-900/5">
        {/* <div className="p-4 mb-2">
          <h5 className="text-xl font-semibold text-gray-300">Sidebar</h5>
        </div> */}
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 text-base text-gray-300">
          
          {/* E-Commerce */}
          {/* <div className="relative">
            <button
              onClick={() => toggleDropdown("ecommerce")}
              className="flex items-center justify-between w-full p-3 text-xl font-semibold border-b-0 text-gray-300 hover:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="mr-auto">E-Commerce</p>
              <span className={`ml-4 transition-transform ${openDropdown === "ecommerce" ? "rotate-180" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-4 h-4 mx-auto"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
              </span>
            </button>
            {openDropdown === "ecommerce" && (
              <div className="ml-6">
                <div className="p-2 hover:bg-gray-700 cursor-pointer">Orders</div>
                <div className="p-2 hover:bg-gray-700 cursor-pointer">Products</div>
              </div>
            )}
          </div> */}

          {/* Other Links */}
          <div className="p-3 hover:bg-gray-700 cursor-pointer rounded">Inbox</div>
          {currentUser &&  <Link to={`/userDetails/${currentUser._id}`} className="p-3 hover:bg-gray-700 cursor-pointer rounded">Profile</Link>}
          <div className="p-3 hover:bg-gray-700 cursor-pointer rounded">Settings</div>
          <Link to="/" className="p-3 hover:bg-gray-700 cursor-pointer rounded">Log Out</Link>
        </nav>
      </div>
        </div>
          <div className="col-span-2 px-3">
            <div className="my-3">
            <div className="max-w-3xl  bg-redditBlack p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">Create a Post</h2>
              <textarea
                className="w-full p-3 text-black mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
                rows="1"
                onChange={(e) => handlePostCreator(e)}
                value={newPost.title}
                name="title"
              ></textarea>
              <textarea
                className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What's on your mind?"
                rows="4"
                onChange={(e) => handlePostCreator(e)}
                value={newPost.description}
                name="description"
              ></textarea>
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 cursor-pointer text-red-400 ">
                <div>
                  <input type="file" onChange={handleFileChange} className="hidden" />
                  <span className="text-sm font-medium"><Avatar src={"https://img.icons8.com/?size=100&id=RxzRPd8sH7Ru&format=png&color=000000"} /> Add Image</span>           
                </div>
                </label>
                {selectedFileName && (
                  <span className="text-sm text-white truncate">
                    {selectedFileName}
                  </span>
                )}
                <button onClick={() => handlePostSubmit()} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Post
                </button>
              </div>
            </div>
            </div>
            <hr className="mx-2"/>
            <div>
            {posts && (
              posts.map((post) =>
              (<div key={post._id} className="mt-2 p-2">
                <span className="inline-flex"><Avatar className="me-3" size="xs" src="https://placehold.co/600x400" /><p className="me-8">{post.author ? post.author.name : "Dummy Name"}</p>.<p className="text-[15px]">Time</p></span>
                
                <p className="text-[30px] mt-2 mb-3">{post.title}</p>
                <p>{post.description}</p>
                <img className="h-98 w-full rounded-lg object-cover" src={post.imgUrl} alt="Post Image"/>
                <span className="inline-flex mt-3 mb-1">
                 {/* <div className="hover:cursor-pointer"><Avatar src={like_button} className="me-3" size="sm"/></div>  */}
                 <div className="hover:cursor-pointer">  
                 <IconButton color="blue" size="sm" onClick={() => likeHandler(post._id)}   className="rounded-full me-5" ripple={true}>
                  <i className="fas fa-heart" />
                 </IconButton>

                </div> 
                 <div className="hover:cursor-pointer"><Avatar onClick={() => togglePosts(post._id)} src={comment} className="me-3" size="sm"/></div>  
                </span>
                <div style={{display: commentId == post._id  ? "block":"none"}}>
                  <h3>Comment Section</h3>
                  <div>
                  <span className="inline-flex"><Avatar className="me-3" size="xs" src="https://placehold.co/600x400" />
                    <textarea placeholder="Write a comment..." value={commentDetails} onChange={(e) => setDetails(e.target.value)} style={{Width:"100%"}} className="bg-gray-800 rounded-xl p-4"  cols={95}/>
                    <button style={{height:"50px"}} onClick={() => handleCommentSubmit(post._id)} className="ms-6 bg-red-500 rounded px-3 py-2">Post</button>
                  </span>
                 {currentPostComments.length > 0 ? <>
                  <ul className="space-y-4 p-4  rounded-lg shadow">
                    {currentPostComments.map((comm) => 
                    <li key={comm._id}>
                      <span className="inline-flex ">
                      <Avatar className="me-3" size="xs" src={comm.userId.usrImgUrl ||"https://placehold.co/600x400"}></Avatar>
                        <p className="p-3 rounded-lg w-96 border border-gray-200">
                        {comm.content}
                        </p>
                      </span>
                      </li>)}
                  </ul></> : <p className="bg-brown-500">Empty Comment Section</p>}
                  </div>

                </div>
                <hr className="mt-2"/>
              </div>))
            )}
            </div>
            
          </div>
          <div className="bg-gray-700 ps-3">
           {/* <p>User Suggestions/activites</p>
           <h2>Popular near you</h2> */}
           <div>
          
            <div className="relative">
      {/* Activity Button */}
      <button
        onClick={() => toggleDropdown("activity")}
        className="flex items-center justify-between w-full p-3 text-xl font-semibold border-b-0 text-gray-300 hover:text-blue-gray-900"
      >
        <div className="grid mr-4 place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        </div>
        <p className="mr-auto">Recent {" "}Activities</p>
        <span
          className={`ml-4 transition-transform ${
            openDropdown.activity ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-4 h-4 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {/* Activity Dropdown Content */}
      {openDropdown.activity && (
        <div className="ml-6">
          {/* Comments Button */}
          <section id="commentSection">
          <button
            onClick={() => toggleDropdown("comments")}
            className="flex items-center justify-between w-full p-3 text-xl font-semibold border-b-0 text-gray-300 hover:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </div>
            <p className="mr-auto">Recent Comments</p>
            <span
              className={`ml-4 transition-transform ${
                openDropdown.comments ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
          <ul className="text-black">
                  { (currentUser && openDropdown.comments ) && currentUser.comments.slice(-3).map((comment) => (<li key={comment._id}>{comment.content}</li>))}
                </ul>
          </section>
        

          {/* Posts Button */}
          <section  id="postSection">
          <button
            onClick={() => toggleDropdown("posts")}
            className="flex items-center justify-between w-full p-3 text-xl font-semibold border-b-0 text-gray-300 hover:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            <p className="mr-auto">Recent Posts</p>
            <span
              className={`ml-4 transition-transform ${
                openDropdown.posts ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>

          <ul className="text-black">
                  { (currentUser && openDropdown.posts) &&  currentUser.posts.slice(-3).map((post) => ( <Link  key={post._id} to={`/post/${post._id}`}><li >{post.title}</li></Link> ))}
                </ul>
          </section>
         
        </div>
      )}
    </div>
           </div>
           
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};


export default UserLanding;