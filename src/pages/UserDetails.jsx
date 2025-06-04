import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostByID } from "../features/postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../features/userSlice";
import { useState } from "react";
import Sidebar from "../components/SideBar";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [update, setUpdate] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    usrImgUrl: "",
  });
  // console.log(currentUser);

  const handleNavigate = (id) => {
    // console.log(id);
    dispatch(getPostByID(id));
    navigate(`/post/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((pval) => ({
      ...pval,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(update);
  };

  useEffect(() => {
    const user = localStorage.getItem("user"); // or however you store it
    if (user) {
      dispatch(getCurrentUser(user._id));
    }
  }, [dispatch]);

  return (
    <>
      <div className="bg-redditBlack  text-white min-h-screen grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div>
          <Sidebar user={currentUser} />
        </div>

        {/* Main Section */}
        <div className="col-span-2 p-5">
          <h1 className="text-3xl font-semibold">User Profile</h1>

          {/* Profile Section */}
          <div className="mt-5">
            <img
              className="h-40 w-40 rounded-full object-cover shadow-lg"
              src={currentUser.usrImgUrl || "https://placehold.co/600x400"}
              alt={currentUser.name || "User_Profile"}
            />
            <p className="text-2xl mt-3 ms-10 font-semibold">
              {currentUser.name}
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className=" text-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
              <h2 className="text-2xl font-semibold ">Details</h2>

              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => handleChange(e)}
                  name="name"
                  value={update.name}
                  placeholder={currentUser.name}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={update.email}
                  placeholder={currentUser.email}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={update.password}
                  placeholder={currentUser.password}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="age" className="block mb-1 font-medium">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={update.age}
                  onChange={(e) => handleChange(e)}
                  placeholder={currentUser.age}
                  min="12"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="usrImgUrl" className="block mb-1 font-medium">
                  User Image URL
                </label>
                <input
                  type="text"
                  id="usrImgUrl"
                  name="usrImgUrl"
                  onChange={(e) => handleChange(e)}
                  value={update.usrImgUrl}
                  placeholder={currentUser.usrImgUrl}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Save
              </button>
            </form>
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
                      {/* { console.log(post)} */}
                      <p className="font-semibold">{post.title}</p>
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
                      onClick={() => handleNavigate(like?._id)}
                      key={like._id}
                      className="bg-blue-500 text-white p-3 rounded-md shadow-md"
                    >
                      <p>
                       <span className="font-semibold">{like?.author?.name}</span>'s post  <span className="font-semibold">{like?.title}</span>
                      </p>
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
