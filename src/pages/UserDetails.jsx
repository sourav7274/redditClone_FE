import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostByID } from "../features/postSlice";
import { useDispatch } from "react-redux";
const UserPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser);


  const handleNavigate =(id) =>{
    console.log(id)
    dispatch(getPostByID(id))
     navigate(`/post/${id}`)
  }

  return (
    <>
      <div className="bg-redditBlack p-5 text-white min-h-screen grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3  p-5 rounded-lg shadow-lg">
          <div className="flex flex-col gap-3">
            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded-md transition">
              Inbox
            </div>
            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded-md transition">
              Settings
            </div>
            <Link
              to="/"
              className="p-3 hover:bg-gray-700 cursor-pointer rounded-md transition"
            >
              Log Out
            </Link>
            <Link
              className="p-3 hover:bg-gray-700 cursor-pointer rounded-md transition"
              to={`/user/${currentUser._id}`}
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Main Section */}
        <div className="col-span-9 p-5">
          <h1 className="text-3xl font-semibold">User Profile</h1>

          {/* Profile Section */}
          <div className="flex flex-col items-center mt-5">
            <img
              className="h-40 w-40 rounded-full object-cover shadow-lg"
              src={currentUser.usrImgUrl || "https://placehold.co/600x400"}
              alt={currentUser.name || "User_Profile"}
            />
            <p className="text-2xl mt-3 font-semibold">{currentUser.name}</p>
          </div>

          {/* Activity History */}
          <div className="mt-8">
            <p className="text-3xl font-semibold">Activity History</p>

            {/* Posts */}
            {currentUser.posts?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-red-400">
                  Created Posts
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentUser.posts.map((post) => (
                      <div
                      onClick={() => handleNavigate(post._id)}
                        key={post._id}
                        className="bg-red-500 text-white p-3 rounded-md shadow-md"
                      >
                        { console.log(post)}
                        <p>{post.title}</p>
                      </div>                  
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {currentUser.comments?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-green-400">
                  Comments
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentUser.comments.map((comment) => (
                      <div
                      onClick={() => handleNavigate(comment.postId._id)}
                        key={comment._id}
                        className="bg-green-500 text-white p-3 rounded-md shadow-md"
                      >
                        <p>
                          {comment.content} on{" "}
                          <span className="font-semibold">
                            {comment.postId.title}
                          </span>
                        </p>
                      </div>
                 
                  ))}
                </div>
              </div>
            )}

            {/* Liked Posts */}
            {currentUser.likedPosts?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-400">
                  Liked Posts
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentUser.likedPosts.map((like) => (
                   
                      <div
                      onClick={() => handleNavigate(like.postId._id)}
                        key={like._id}
                        className="bg-blue-500 text-white p-3 rounded-md shadow-md"
                      >
                        <p>
                          Liked{" "}
                          <span className="font-semibold">
                            {like.postId.title}
                          </span>{" "}
                          by{" "}
                          <span className="italic">
                          </span>
                        </p>
                        {console.log("Like details",like)}
                      </div>
                  
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
