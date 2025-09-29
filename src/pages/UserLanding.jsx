import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addPost, getPosts } from "../features/postSlice";
import { Avatar } from "@material-tailwind/react";
import comment from "../images/comment.png";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { postComment } from "../features/commentSlice";
import { getCommentsByPost } from "../features/commentSlice";
import { clearComments } from "../features/commentSlice";
import { likePost } from "../features/likeSlice";
import {
  updateUserActivities,
  getLikedPosts,
  getOtherUSers,
  addFriend,
  fetchSentRequests,
  unsendFriendRequest,
  fetchRecievingRequests,
  chnageRequestStatus,
  fetchFriends,
} from "../features/userSlice";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";
import ThemeToggle from "../components/ThemeToggle";

const UserLanding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentId, setCommentId] = useState("");
  const [commentDetails, setDetails] = useState("");
  const [selectedFileName, setFileName] = useState("");
  const { likedPosts } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);
  const { comments, loading } = useSelector((state) => state.comments);
  const { otherUser } = useSelector((state) => state.user);
  const { sentRequest, receivingRequests, friends } = useSelector(
    (state) => state.user
  );
  const [file, setFile] = useState(null);
  const [newPost, setPost] = useState({
    title: "",
    author: currentUser ? currentUser._id : "",
    imgUrl: null,
    description: "",
  });

  const handlePostCreator = (e) => {
    const { name, value } = e.target;
    setPost((pval) => ({
      ...pval,
      [name]: value,
    }));
  };

  // Debug logging moved to useEffect
  useEffect(() => {
    sentRequest.forEach((req) => {
      console.log(req, otherUser);
    });
  }, [sentRequest, otherUser]);

  const [openDropdown, setOpenDropdown] = useState({
    activity: false,
    comments: false,
    posts: false,
    likes: false,
    requests: false,
    incomingRequests: false,
  });

  const toggleDropdown = (menu) => {
    setOpenDropdown((pval) => ({
      ...pval,
      [menu]: !pval[menu],
    }));
  };

  useEffect(() => {
    dispatch(getOtherUSers(currentUser?._id));
  }, [dispatch, currentUser]);

  useEffect(() => {
    dispatch(getLikedPosts(currentUser?._id));
  }, [dispatch, currentUser]);

  useEffect(() => {
    dispatch(getPosts(currentUser?._id));
    // console.log(currentUser);
  }, [dispatch, currentUser]);

  useEffect(() => {
    dispatch(fetchSentRequests(currentUser?._id));
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchRecievingRequests(currentUser?._id));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchFriends(currentUser?._id));
    }
  }, [dispatch, currentUser]);

  const handleCommentSubmit = (id) => {
    const newComment = {
      postId: id,
      userId: currentUser ? currentUser._id : "",
      content: commentDetails,
    };
    if (newComment.content !== "" && newComment.userId !== "") {
      dispatch(postComment(newComment));
      dispatch(updateUserActivities({ type: "comment", data: newComment })); // Update user activities
    } else {
      alert("Sign In before commenting");
    }

    setDetails("");
    setCommentId("");
  };

  const togglePosts = (id) => {
    if (commentId === id) {
      setCommentId("");
      dispatch(clearComments());
    } else {
      setCommentId(id);
      dispatch(getCommentsByPost(id));
    }
  };

  const likeHandler = (id) => {
    const newLike = {
      postId: id,
      userId: currentUser._id,
    };
    //  console.log(newLike)
    dispatch(likePost(newLike));
    dispatch(updateUserActivities({ type: "like", data: newLike })); // Update user activities
  };

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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      if (file) {
        try {
          const fileResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dqqfauejn/image/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (fileResponse.status !== 200) {
            console.log("Some Error Occured", file);
          }
          const fileUrl = await fileResponse.data.url;
          if (fileUrl) {
            const updatedPost = { ...newPost, imgUrl: fileUrl };
            dispatch(addPost(updatedPost));
            dispatch(updateUserActivities({ type: "post", data: updatedPost })); // Update user activities
            setPost({
              title: "",
              author: currentUser ? currentUser._id : "",
              description: "",
              imgUrl: null,
            });
            dispatch(getPosts());
            setFileName("");
          }
        } catch (err) {
          console.log("Error uploading image", err);
        }
      } else {
        console.log(newPost);
        dispatch(addPost(newPost));
        dispatch(updateUserActivities({ type: "post", data: newPost })); // Update user activities
        setPost({
          title: "",
          author: currentUser ? currentUser._id : "",
          description: "",
          imgUrl: null,
        });
        dispatch(getPosts());
        setFileName("");
      }
    } else {
      alert("Sign in before posting");
    }
  };

  // console.log(posts)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handlePostDetails = (id) => {
    navigate(`/post/${id}`);
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      await dispatch(chnageRequestStatus({ id: requestId, status: status }));
      // Refresh all relevant data after status change
      dispatch(fetchRecievingRequests(currentUser?._id));
      dispatch(fetchFriends(currentUser?._id));
      dispatch(getOtherUSers(currentUser?._id));
      dispatch(fetchSentRequests(currentUser?._id));
    } catch (error) {
      console.error("Error updating friend request:", error);
    }
  };

  const handleRequest = async (id) => {
    await dispatch(
      addFriend({ sendingUserId: currentUser._id, recievingUserId: id })
    );
    dispatch(fetchSentRequests(currentUser._id)); // Refresh sent requests
    // dispatch(getOtherUSers(currentUser._id)); // Refresh other users
    // dispatch(getLikedPosts(currentUser._id)); // Refresh liked posts if needed
    // dispatch(getCurrentUser(currentUser._id)); // If you want to refresh the whole user object
  };

  const handleUnsend = async (requestId) => {
    await dispatch(
      unsendFriendRequest({ requestId, senderId: currentUser._id })
    );
    dispatch(fetchSentRequests(currentUser._id));
  };

  const listVariants = {
    initial: {
      scale: 1,
    },
    animate: {
      transition: {
        stiffness: 100,
      },
    },
    whileHover: {
      scale: 1.3,
      color: "red",
      originX: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-1000"
    >
      <main className="flex-grow text-white">
        <div className="grid grid-cols-4">
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <h3 className="text-white dark:text-gray-100 transition-colors duration-1000">
                {currentUser && currentUser.name ? (
                  <>Welcome {currentUser.name}</>
                ) : (
                  <>Please Sign In</>
                )}
              </h3>
              <ThemeToggle />
            </motion.div>
            <Sidebar user={currentUser} />
          </div>
          {/* Add a Post Section */}
          <div className="col-span-2 px-3">
            <div className="my-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-3xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white/20 dark:border-gray-700/30 transition-all duration-1000"
              >
                <h2 className="text-xl font-semibold text-white dark:text-gray-100 mb-4 transition-colors duration-1000">
                  Create a Post
                </h2>
                <textarea
                  className="w-full p-3 text-white dark:text-gray-100 bg-white/10 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-1000"
                  placeholder="Title"
                  rows="1"
                  onChange={(e) => handlePostCreator(e)}
                  value={newPost.title}
                  name="title"
                ></textarea>
                <textarea
                  className="w-full p-3 text-white dark:text-gray-100 bg-white/10 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-white/60 dark:placeholder-gray-400 transition-all duration-1000"
                  placeholder="What's on your mind?"
                  rows="4"
                  onChange={(e) => handlePostCreator(e)}
                  value={newPost.description}
                  name="description"
                ></textarea>
                <div className="flex items-center justify-between mt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-purple-400 hover:text-purple-300 transition-colors duration-300">
                    <div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span className="text-sm font-medium flex items-center gap-2">
                        <Avatar
                          src={
                            "https://img.icons8.com/?size=100&id=RxzRPd8sH7Ru&format=png&color=000000"
                          }
                        />
                        Add Image
                      </span>
                    </div>
                  </label>
                  {selectedFileName && (
                    <span className="text-sm text-white/80 dark:text-gray-300 truncate transition-colors duration-1000">
                      {selectedFileName}
                    </span>
                  )}
                  <motion.button
                    onClick={() => handlePostSubmit()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    Post
                  </motion.button>
                </div>
              </motion.div>
            </div>
            <hr className="mx-2 border-white/20 dark:border-gray-700/30 transition-colors duration-1000" />
            <div className="space-y-6">
              {posts &&
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 transition-all duration-1000"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar
                        className="w-10 h-10"
                        src="https://placehold.co/600x400"
                      />
                      <div>
                        <p className="text-white dark:text-gray-100 font-semibold transition-colors duration-1000">
                          {post.author ? post.author.name : "Dummy Name"}
                        </p>
                        <p className="text-white/60 dark:text-gray-400 text-sm transition-colors duration-1000">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-white dark:text-gray-100 text-2xl font-bold mb-3 transition-colors duration-1000">
                      {post.title}
                    </h3>
                    <p className="text-white/80 dark:text-gray-300 mb-4 transition-colors duration-1000">
                      {post.description}
                    </p>
                    {post?.imgUrl !== null && (
                      <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-96 w-full rounded-xl object-cover mb-4"
                        src={post.imgUrl}
                        alt="Post Image"
                      />
                    )}

                    <div className="flex items-center gap-6">
                      <motion.button
                        onClick={() => likeHandler(post._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
                          likedPosts.includes(post._id)
                            ? "text-red-500 bg-red-500/20"
                            : "text-white/70 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10"
                        }`}
                      >
                        <i className="fas fa-heart" />
                        <span className="font-medium">
                          {post.likes ? post.likes.length : 0}
                        </span>
                      </motion.button>

                      <motion.button
                        onClick={() => togglePosts(post._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 p-2 rounded-lg text-white/70 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                      >
                        <img src={comment} alt="Comment" className="w-5 h-5" />
                        <span className="font-medium">
                          {post.comments ? post.comments.length : 0}
                        </span>
                      </motion.button>
                    </div>
                    {commentId === post._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 p-4 bg-white/5 dark:bg-gray-700/20 rounded-xl border border-white/10 dark:border-gray-600/30"
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar
                            className="w-8 h-8"
                            src="https://placehold.co/600x400"
                          />
                          <div className="flex-1">
                            <textarea
                              placeholder="Write a comment..."
                              value={commentDetails}
                              onChange={(e) => setDetails(e.target.value)}
                              className="w-full p-3 text-white dark:text-gray-100 bg-white/10 dark:bg-gray-600/30 border border-white/20 dark:border-gray-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-white/60 dark:placeholder-gray-400 transition-all duration-1000 resize-none"
                              rows="3"
                            ></textarea>
                            <motion.button
                              onClick={() => handleCommentSubmit(post._id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                            >
                              Post Comment
                            </motion.button>
                          </div>
                        </div>
                        {loading ? (
                          <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                            <span className="ml-2 text-white/70 dark:text-gray-300">
                              Loading...
                            </span>
                          </div>
                        ) : comments.length > 0 ? (
                          <div className="mt-4 space-y-3">
                            {comments.map((comm) => (
                              <motion.div
                                key={comm._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start space-x-3 p-3 bg-white/5 dark:bg-gray-600/20 rounded-lg"
                              >
                                <Avatar
                                  className="w-8 h-8"
                                  src={
                                    comm.userId.usrImgUrl ||
                                    "https://placehold.co/600x400"
                                  }
                                />
                                <div className="flex-1">
                                  <p className="text-white dark:text-gray-100 font-semibold text-sm transition-colors duration-1000">
                                    {comm.userId.name}
                                  </p>
                                  <p className="text-white/80 dark:text-gray-300 text-sm transition-colors duration-1000">
                                    {comm.content}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="bg-white/5 dark:bg-gray-700/20 rounded-xl text-center py-4 mt-4 text-white/60 dark:text-gray-400 transition-colors duration-1000">
                            No comments yet
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
          <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg border-l border-white/20 dark:border-gray-700/30 p-6 transition-all duration-1000">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Friends Section */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white dark:text-gray-100 font-bold text-lg transition-colors duration-1000">
                  Friends ({friends.length})
                </h3>
                <motion.button
                  onClick={() => dispatch(fetchFriends(currentUser?._id))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all duration-300"
                  title="Refresh friends"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </motion.button>
              </div>
              {friends && friends.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {friends.slice(0, 3).map((friend, index) => (
                    <motion.div
                      key={friend._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 dark:bg-gray-700/20 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/30 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar
                          size="sm"
                          src={friend.usrImgUrl || "https://placehold.co/100"}
                        />
                        <div>
                          <p className="text-white dark:text-gray-100 font-medium transition-colors duration-1000">
                            {friend.name}
                          </p>
                          <p className="text-white/60 dark:text-gray-400 text-xs transition-colors duration-1000">
                            Friend
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all duration-300"
                          title="Message friend"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                  {friends.length > 3 && (
                    <div className="text-center py-2 text-white/60 dark:text-gray-400 text-sm">
                      +{friends.length - 3} more friends
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 mb-6 text-white/60 dark:text-gray-400 transition-colors duration-1000">
                  No friends yet
                </div>
              )}

              <h3 className="text-white dark:text-gray-100 font-bold text-lg mb-6 transition-colors duration-1000">
                People You May Know
              </h3>
              <div className="space-y-3">
                {otherUser.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 dark:bg-gray-700/20 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        size="sm"
                        src={user.usrImgUrl || "https://placehold.co/100"}
                      />
                      <div>
                        <p className="text-white dark:text-gray-100 font-medium transition-colors duration-1000">
                          {user.name}
                        </p>
                        <p className="text-white/60 dark:text-gray-400 text-xs transition-colors duration-1000">
                          Suggested for you
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => {
                        const isPending = sentRequest.some(
                          (r) => r.receiverId === user._id
                        );
                        if (!isPending) {
                          handleRequest(user._id);
                        } else {
                          const req = sentRequest.find(
                            (r) => r.receiverId === user._id
                          );
                          if (req) handleUnsend(req.requestId);
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        !sentRequest.some((r) => r.receiverId === user._id)
                          ? "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                          : "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                      }`}
                      title={
                        !sentRequest.some((r) => r.receiverId === user._id)
                          ? "Send friend request"
                          : "Unsend request"
                      }
                    >
                      {!sentRequest.some((r) => r.receiverId === user._id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                          />
                        </svg>
                      ) : (
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 0.6 }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>

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
                  <p className="mr-auto">Recent Activities</p>
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
                      <ul>
                        {currentUser &&
                          openDropdown.comments &&
                          currentUser.comments.slice(-3).map((comment) => (
                            <motion.div
                              variants={listVariants}
                              whileHover="whileHover"
                              transition="transition"
                              key={comment._id}
                              className="my-2 bg-gray-800 ps-4 py-2 rounded-lg"
                            >
                              <Link
                                onClick={() =>
                                  handlePostDetails(comment?.postId?._id)
                                }
                              >
                                <li>
                                  {comment.content} on{" "}
                                  {comment?.postId?.author?.name}'s post{" "}
                                  {comment?.postId?.title}{" "}
                                </li>
                              </Link>
                            </motion.div>
                          ))}
                      </ul>
                    </section>

                    {/* Posts Button */}
                    <section id="postSection">
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

                      <ul>
                        {currentUser &&
                          openDropdown.posts &&
                          currentUser.posts.slice(-3).map((post) => (
                            <motion.div
                              variants={listVariants}
                              whileHover="whileHover"
                              transition="transition"
                              key={post._id}
                              className="my-2 bg-gray-800 ps-4 py-2 rounded-lg"
                            >
                              <Link onClick={() => handlePostDetails(post._id)}>
                                <li>{post.title}</li>
                              </Link>
                            </motion.div>
                          ))}
                      </ul>
                    </section>

                    <section id="likeSection">
                      <button
                        onClick={() => toggleDropdown("likes")}
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
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        </div>
                        <p className="mr-auto">Recent Likes</p>
                        <span
                          className={`ml-4 transition-transform ${
                            openDropdown.likes ? "rotate-180" : ""
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
                      <ul>
                        {currentUser &&
                          openDropdown.likes &&
                          currentUser.likedPosts.map((post) => (
                            <motion.div
                              variants={listVariants}
                              animate="animate"
                              initial="initial"
                              whileHover="whileHover"
                              key={post._id}
                              className="my-2 bg-gray-800 ps-4 py-2 rounded-lg"
                            >
                              <Link
                                onClick={() => handlePostDetails(post?._id)}
                              >
                                <li>
                                  {post?.author?.name}'s post - {post?.title}
                                </li>
                              </Link>
                            </motion.div>
                          ))}
                      </ul>
                    </section>
                  </div>
                )}
              </div>

              {/* Friend Requests Section - Same design as Recent Activities */}
              <div className="relative">
                {/* Friend Requests Button */}
                <button
                  onClick={() => {
                    toggleDropdown("requests");
                    if (!openDropdown.requests) {
                      dispatch(fetchRecievingRequests(currentUser?._id));
                    }
                  }}
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
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                  </div>
                  <p className="mr-auto">
                    Friend Requests ({receivingRequests.length})
                  </p>
                  <span
                    className={`ml-4 transition-transform ${
                      openDropdown.requests ? "rotate-180" : ""
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

                {/* Friend Requests Dropdown Content */}
                {openDropdown.requests && (
                  <div className="ml-6">
                    <section id="friendRequestSection">
                      {receivingRequests && receivingRequests.length > 0 ? (
                        <ul className="space-y-2">
                          {receivingRequests.map((request, index) => (
                            <motion.div
                              key={request._id}
                              variants={listVariants}
                              whileHover="whileHover"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="my-2 bg-gray-800 ps-4 py-2 rounded-lg flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar
                                  size="sm"
                                  src={
                                    request.sendingUserId?.usrImgUrl ||
                                    "https://placehold.co/100"
                                  }
                                />
                                <div>
                                  <p className="text-white text-sm font-medium">
                                    {request.sendingUserId?.name ||
                                      "Unknown User"}
                                  </p>
                                  <p className="text-gray-400 text-xs">
                                    Wants to be friends
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    updateRequestStatus(request._id, "accepted")
                                  }
                                  className="text-green-400 hover:text-green-300 text-sm font-medium px-2 py-1 rounded bg-green-900/30 hover:bg-green-900/50"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    updateRequestStatus(request._id, "declined")
                                  }
                                  className="text-red-400 hover:text-red-300 text-sm font-medium px-2 py-1 rounded bg-red-900/30 hover:bg-red-900/50"
                                >
                                  Decline
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </ul>
                      ) : (
                        <div className="my-2 bg-gray-800 ps-4 py-2 rounded-lg">
                          <p className="text-gray-400 text-sm">
                            No friend requests
                          </p>
                        </div>
                      )}
                    </section>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default UserLanding;
