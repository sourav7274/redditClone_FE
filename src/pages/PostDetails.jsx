import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { setPostDetails } from "../features/postSlice";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion"; // Added for subtle animations
import PostSkeleton from "../components/PostSkeleton";

const PostDetails = () => {
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let post = useSelector((state) => state.post.PostDetails);

  useEffect(() => {
    if (post && post.comments) {
      setCurrentPostComments(post.comments);
    }
  }, [post]);

  useEffect(() => {
    if (post == null) {
      const postDetails = sessionStorage.getItem("post");
      if (postDetails) {
        dispatch(setPostDetails(JSON.parse(postDetails)));
      }
    }
  }, [post, dispatch]);

  // Handle initial loading state for post details
  useEffect(() => {
    if (post) {
      setIsInitialLoad(false);
    }
  }, [post]);

  // Fallback: turn off skeleton after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants for post card and comments
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const commentVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-redditBlack text-white">
      <main className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <Sidebar user={currentUser} />
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3 pt-6">
            {(post && !isInitialLoad) ? (
              <motion.div
                className="w-full max-w-4xl mx-auto"
                variants={cardVariants}
                initial="initial"
                animate="animate"
              >
                <div className="p-6 bg-redditDarkGray rounded-xl shadow-lg ">
                  {/* Post Header */}
                  <div className="flex items-center mb-4">
                    <Avatar
                      className="mr-3 border-2 border-redditOrange/50"
                      size="sm"
                      src={post.author?.usrImgUrl || "https://placehold.co/600x400"}
                      alt={post.author?.name || "User"}
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {post.author ? post.author.name : "Unknown"}
                      </p>
                      <p className="text-sm text-redditLightGray">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Unknown date"}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <h1 className="mt-2 text-3xl font-bold text-white leading-tight">
                    {post.title}
                  </h1>
                  <p className="mt-3 text-lg text-gray-200 leading-relaxed">
                    {post.description}
                  </p>
                  {post.imgUrl && (
                    <img
                      className="mt-4 w-full rounded-lg object-cover max-h-[500px] shadow-md"
                      src={post.imgUrl}
                      alt={post.title}
                    />
                  )}

                  {/* Interaction Buttons */}
                  <div className="flex items-center mt-4 mb-6">
                    <IconButton
                      color="blue"
                      size="sm"
                      onClick={() => console.log("Like Clicked")}
                      className="rounded-full mr-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                      <i className="fas fa-heart text-white" />
                    </IconButton>
                    <span className="text-sm text-redditLightGray">
                      {post.likes?.length || 0} Likes
                    </span>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-redditOrange mb-4">
                      Comments
                    </h2>
                    {currentPostComments?.length > 0 ? (
                      <ul className="space-y-3">
                        {currentPostComments.map((comm) => (
                          <motion.li
                            key={comm._id}
                            className="bg-gray-800/50 p-4 rounded-lg border border-redditLightGray/20 hover:bg-gray-800/70 transition-colors duration-200"
                            variants={commentVariants}
                            initial="initial"
                            animate="animate"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar
                                src={comm.userId?.usrImgUrl || "https://placehold.co/600x400"}
                                size="xs"
                                className="border border-redditLightGray/50"
                                alt={comm.userId?.name || "Commenter"}
                              />
                              <div>
                                <p className="text-sm font-medium text-redditLightGray">
                                  {comm.userId?.name || "Anonymous"}
                                </p>
                                <p className="text-gray-200">{comm.content}</p>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No comments yet.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <PostSkeleton count={1} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetails;