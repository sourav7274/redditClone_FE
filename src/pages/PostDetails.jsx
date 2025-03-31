import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Avatar, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const [commentDetails, setCommentDetails] = useState("");
  const [currentPostComments, setCurrentPostComments] = useState([]);


  const post = useSelector((state) => state.post.PostDetails);
  useEffect(() =>{
    if(post)
      {
        setCurrentPostComments(post.comments)
      }
  })

  console.log(post);

  return (
    <div className="min-h-screen flex flex-col">
    <main className="flex-grow text-white bg-redditBlack">
      <div className="grid grid-cols-4 gap-4">
        {/* Left Sidebar */}
        <div style={{width:"350px"}} className="bg-redditBlack text-white p-4 ">
          <h1>Navigation Area</h1>
          <nav className="flex min-w-[240px] flex-col gap-1 p-2 text-base text-gray-300">
            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded">Inbox</div>
            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded">Profile</div>
            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded">Settings</div>
            <Link to="/" className="p-3 hover:bg-gray-700 cursor-pointer rounded">Log Out</Link>
          </nav>
        </div>
  
        {/* Main Content - Takes Remaining Space */}
        <div className="pt-4 col-span-2">
          {post ? (
            <div className="w-full max-w-4xl"> {/* Centers and limits max width */}
              <div className="mt-2 p-4 bg-gray-900 rounded-lg">
                <div className="flex ">
                  <Avatar className="mr-3" size="xs" src="https://placehold.co/600x400" />
                  <p className="mr-4">{post.author ? post.author.name : "Unknown"}</p>
                  <p className="text-sm text-gray-400">• Time</p>
                </div>
  
                <p className="mt-3 text-lg">{post.description}</p>
                {post.imgUrl && (
                  <img className="h-98 w-full rounded-lg object-cover mt-4" src={post.imgUrl} alt="Post" />
                )}
  
                <div className="flex items-center mt-3">
                  <IconButton
                    color="blue"
                    size="sm"
                    onClick={() => console.log("Like Clicked")}
                    className="rounded-full mr-5"
                  >
                    <i className="fas fa-heart" />
                  </IconButton>
                </div>
  
                <h3 className="mt-6">Comment Section</h3>
                <textarea
                  value={commentDetails}
                  onChange={(e) => setCommentDetails(e.target.value)}
                  className="bg-gray-800 rounded-xl p-4 w-full mt-2"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={() => console.log("Comment Submitted")}
                  className="mt-3 bg-red-500 rounded px-4 py-2"
                >
                  Post
                </button>
  
                {currentPostComments.length > 0 ? (
                  <ul className="mt-3">
                    {currentPostComments.map((comm) => (
                      <li key={comm._id} className="bg-gray-800 p-2 rounded my-1">{comm.content}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-gray-400">No comments yet.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">Loading post...</p>
          )}
        </div>
      </div>
    </main>
    <Footer />
  </div>
  
  );
};

export default PostDetails;
