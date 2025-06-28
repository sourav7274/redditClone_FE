import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { setPostDetails } from "../features/postSlice";
import Slider from "@material-tailwind/react";
import Sidebar from "../components/SideBar";

const PostDetails = () => {
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let post = useSelector((state) => state.post.PostDetails);
  useEffect(() => {
    if (post && post.comments) {
      setCurrentPostComments(post.comments);
    }
  }, [post]);
  console.log(post?.title)
  // const postDetails = sessionStorage.getItem("post");
  // console.log(postDetails);
  useEffect(() => {
    if (post == null) {
      const postDetails = sessionStorage.getItem("post");
      if (postDetails) {
        dispatch(setPostDetails(JSON.parse(postDetails)));
      }
    }
  }, [post, dispatch]);

  console.log("another test",currentPostComments)
  // console.log(post.comments[0].userId.usrImgUrl);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow text-white bg-redditBlack">
        <div className="grid grid-cols-4 gap-4">
          {/* Left Sidebar */}
        <Sidebar user={currentUser} />

          {/* Main Content - Takes Remaining Space */}
          <div className="pt-4 col-span-2">
            {post ? (
              <div className="w-full max-w-4xl">
                {" "}
                {/* Centers and limits max width */}
                <div className="mt-2 p-4 bg-gray-900 rounded-lg">
                  <div className="flex ">
                    <Avatar
                      className="mr-3"
                      size="xs"
                      src="https://placehold.co/600x400"
                    />
                    <p className="mr-4">
                      {post.author ? post.author.name : "Unknown"}
                    </p>
                    <p className="text-sm text-gray-400">• Time</p>
                  </div>

                  <p className="mt-3 text-lg">{post.description}</p>
                  {post.imgUrl && (
                    <img
                      className="h-98 w-full rounded-lg object-cover mt-4"
                      src={post.imgUrl}
                      alt="Post"
                    />
                  )}

                  <div className="flex items-center mt-3 mb-5">
                    <IconButton
                      color="blue"
                      size="sm"
                      onClick={() => console.log("Like Clicked")}
                      className="rounded-full mr-5"
                    >
                      <i className="fas fa-heart" />
                    </IconButton>
                  </div>

                  {currentPostComments?.length > 0 ? (
                    <ul className="mt-3">
                      {currentPostComments.map((comm) => (
                        <li
                          key={comm._id}
                          className="bg-gray-800 py-2 px-4 rounded my-1"
                        >
                          <div className="flex gap-4">
                            <Avatar src={comm.userId.usrImgUrl} size="xs" />
                            <p>{comm.content}</p>
                          </div>
                        </li>
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
