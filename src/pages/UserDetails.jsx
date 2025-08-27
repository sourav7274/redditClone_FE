import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostByID } from "../features/postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser, updateUser } from "../features/userSlice";
import { useState } from "react";
import { motion } from "motion/react";
import Sidebar from "../components/SideBar";
import { animate } from "motion";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleNavigate = (id) => {
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
    let finalUpdate = {
      name: update.name || currentUser.name,
      age: update.age || currentUser.age,
      email: update.email || currentUser.email,
      password: update.password || currentUser.password,
      usrImgUrl: update.usrImgUrl || currentUser.usrImgUrl,
    };
    dispatch(updateUser({ data: finalUpdate, id: currentUser._id })).then(
      (res) => {
        if (res?.payload == 201) {
          dispatch(getCurrentUser(currentUser._id));
          setIsEditMode(false);
        }
      }
    );
  };

  let diVrainats = {
    initial : {
      scale :1 
    },
    whileHover:{
      scale:1.1
    }
  }


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(getCurrentUser(parsedUser._id));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, [dispatch]);

  // Separate useEffect to update form state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUpdate({
        name: currentUser.name || "",
        age: currentUser.age || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        usrImgUrl: currentUser.usrImgUrl || "",
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="bg-redditBlack text-white min-h-screen flex items-center justify-center">
        <div className="text-xl">No user data available</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-redditBlack text-white min-h-screen grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div>
          <Sidebar user={currentUser} />
        </div>

        {/* Main Section */}
        <div className="col-span-2 p-5">
          <h1 className="text-3xl font-semibold mb-8">User Profile</h1>

          {/* Profile Section */}
          <div className="bg-redditDarkGray p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image */}
              <div className="flex flex-col items-center w-full md:w-auto">
                <img
                  className="h-48 w-48 rounded-full object-cover border-4 border-redditLightGray shadow-md transition-transform duration-200 hover:scale-105"
                  src={currentUser.usrImgUrl || "https://placehold.co/600x400"}
                  alt={currentUser.name || "User_Profile"}
                />
                <p className="text-2xl font-semibold mt-4">
                  {capitalise(currentUser.name)}
                </p>
              </div>

              {/* User Details */}
              <div className="flex-1 w-full">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold border-b border-redditLightGray pb-2">
                    Account Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-redditLightGray text-sm font-medium mb-1">
                        Name
                      </label>
                      <p className="text-white text-lg bg-redditDarkGray p-2 rounded">
                        {currentUser.name}
                      </p>
                    </div>

                    <div>
                      <label className="block text-redditLightGray text-sm font-medium mb-1">
                        Email
                      </label>
                      <p className="text-white text-lg bg-redditDarkGray p-2 rounded">
                        {currentUser.email}
                      </p>
                    </div>

                    <div>
                      <label className="block text-redditLightGray text-sm font-medium mb-1">
                        Age
                      </label>
                      <p className="text-white text-lg bg-redditDarkGray p-2 rounded">
                        {currentUser.age || (
                          <span className="text-redditLightGray">
                            Not specified
                          </span>
                        )}
                      </p>
                    </div>

                    <div>
                      <label className="block text-redditLightGray text-sm font-medium mb-1">
                        Password
                      </label>
                      <div className="flex items-center gap-2">
                        <p className="text-white text-lg bg-redditDarkGray p-2 rounded flex-1">
                          {showPassword ? currentUser.password : "••••••••"}
                        </p>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-redditLightGray hover:text-white p-2"
                          title={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditMode(true)}
                    className="mt-2 px-6 py-2 bg-redditOrange hover:bg-redditDarkOrange rounded-lg font-semibold transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {isEditMode && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-gradient-to-br from-redditDarkGray via-gray-800 to-redditDarkGray p-8 rounded-2xl w-full max-w-lg border border-redditOrange/30 shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-redditOrange rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                  </div>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="text-redditLightGray hover:text-redditOrange hover:bg-redditOrange/10 p-2 rounded-full transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-1">
                  <div className="space-y-5">
                    <div className="group">
                      <label className="block text-redditLightGray text-sm font-semibold mb-2 group-focus-within:text-redditOrange transition-colors">
                        👤 Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder={currentUser.name}
                        value={update.name}
                        onChange={handleChange}
                        className="w-full bg-gradient-to-r from-redditBlack/80 to-gray-900/80 text-white p-3.5 rounded-xl border border-redditLightGray/20 focus:border-redditOrange focus:ring-2 focus:ring-redditOrange/30 outline-none transition-all duration-300 hover:border-redditOrange/50 backdrop-blur-sm"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-redditLightGray text-sm font-semibold mb-2 group-focus-within:text-redditOrange transition-colors">
                        🎂 Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={update.age}
                        placeholder={currentUser.age}
                        onChange={handleChange}
                        className="w-full bg-gradient-to-r from-redditBlack/80 to-gray-900/80 text-white p-3.5 rounded-xl border border-redditLightGray/20 focus:border-redditOrange focus:ring-2 focus:ring-redditOrange/30 outline-none transition-all duration-300 hover:border-redditOrange/50 backdrop-blur-sm"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-redditLightGray text-sm font-semibold mb-2 group-focus-within:text-redditOrange transition-colors">
                        📧 Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder={currentUser.email}
                        value={update.email}
                        onChange={handleChange}
                        className="w-full bg-gradient-to-r from-redditBlack/80 to-gray-900/80 text-white p-3.5 rounded-xl border border-redditLightGray/20 focus:border-redditOrange focus:ring-2 focus:ring-redditOrange/30 outline-none transition-all duration-300 hover:border-redditOrange/50 backdrop-blur-sm"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-redditLightGray text-sm font-semibold mb-2 group-focus-within:text-redditOrange transition-colors">
                        🔒 Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder={currentUser.password || "••••••••"}
                          value={update.password}
                          onChange={handleChange}
                          className="w-full bg-gradient-to-r from-redditBlack/80 to-gray-900/80 text-white p-3.5 rounded-xl border border-redditLightGray/20 focus:border-redditOrange focus:ring-2 focus:ring-redditOrange/30 outline-none transition-all duration-300 hover:border-redditOrange/50 backdrop-blur-sm pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-redditLightGray hover:text-redditOrange transition-colors duration-200 p-1 rounded-lg hover:bg-redditOrange/10"
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>


                  </div>

                  <div className="flex justify-end space-x-4 mt-8 pt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditMode(false)}
                      className="px-6 py-3 bg-gradient-to-r cursor-pointer from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-redditOrange to-orange-600 hover:from-orange-500 hover:to-redditOrange text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-redditOrange/25"
                    >
                      💾 Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
                    <motion.div
                      variants={diVrainats}
                      initial="initial"
                      whileHover="whileHover"
                      onClick={() => handleNavigate(post._id)}
                      key={post._id}
                      className="bg-red-500 cursor-pointer text-white p-3 rounded-md shadow-md"
                    >
                      <p className="font-semibold">{post.title}</p>
                    </motion.div>
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
                    <motion.div
                     variants={diVrainats}
                      initial="initial"
                      whileHover="whileHover"
                      onClick={() => handleNavigate(comment.postId._id)}
                      key={comment._id}
                      className="bg-green-500 cursor-pointer text-white p-3 rounded-md shadow-md"
                    >
                      <p>
                        {comment.content} on{" "}
                        <span className="font-semibold">
                          {comment.postId.title}
                        </span>
                      </p>
                    </motion.div>
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
                    <motion.div
                     variants={diVrainats}
                      initial="initial"
                      whileHover="whileHover"
                      onClick={() => handleNavigate(like?._id)}
                      key={like._id}
                      className="bg-blue-500 cursor-pointer text-white p-3 rounded-md shadow-md"
                    >
                      <p>
                        <span className="font-semibold">
                          {like?.author?.name}
                        </span>
                        's post{" "}
                        <span className="font-semibold">{like?.title}</span>
                      </p>
                    </motion.div>
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
