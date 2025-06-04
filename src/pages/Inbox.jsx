import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOtherUSers } from "../features/userSlice";
import axios from "axios";
import { io } from "socket.io-client";
import { useRef } from "react";
import VideoCall from "./VideoCall"; // Import the VideoCall component
import Sidebar from "../components/SideBar";

const socket = io("http://localhost:3000");

const Inbox = () => {
  const [user, setUsers] = useState([]);
  const [currentChat, setChat] = useState(null);
  const [currentMessage, setCurMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const{ currentUser} = useSelector((state) => state.user);
  const otherUsers = useSelector((state) => state.user.otherUser);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  const [connectDis, setConnectDIs] = useState(false);

  useEffect(() => {
    dispatch(getOtherUSers(currentUser._id));
  }, [dispatch, currentUser._id]);

  useEffect(() => {
    if (messages.length > 0) {
      messageEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const fetchMessages = async (receiver) => {
    try {
      const { data } = await axios.get("http://localhost:3000/messages", {
        params: { sender: currentUser._id, receiver: receiver._id },
      });
      setMessages(data);
      setChat(receiver);
      setUsers(receiver);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.emit("join", currentUser._id);
  }, [currentUser._id]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    const messageData = {
      sender: currentUser._id,
      receiver: currentChat._id,
      message: currentMessage,
    };
    socket.emit("send_message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setCurMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col  bg-redditBlack text-white">
      <div className=" flex-grow grid grid-cols-4 h-full">
        {/* Sidebar */}

          <Sidebar user={currentUser}/>

        {/* Chat Section */}
        {connectDis === true ? (
          <div className="col-span-2 flex bg-gray-900 flex-col p-6 border-x border-gray-700">
            <VideoCall
              socket={socket}
              onDisconnect={() => setConnectDIs(false)}
              receiverId={currentChat?._id}
              currentUserId={currentUser._id}
            />
          </div>
        ) : (
          <div className="col-span-2 flex bg-gray-900 flex-col justify-between p-6 border-x border-gray-700">
            {currentChat ? (
              <>
                <h3 className="flex items-center justify-between text-lg font-medium mb-4">
                  <span>
                    Chatting with{" "}
                    <span className="text-green-400 ms-3">{user.name}</span>
                  </span>
                  <button
                    onClick={() => setConnectDIs(!connectDis)}
                    className="text-green-400"
                  >
                    Connect
                  </button>
                </h3>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {messages.map(
                    (msg, index) =>
                      msg && (
                        <div
                          key={index}
                          className={`max-w-xs p-3 rounded-lg ${
                            msg.sender === currentUser._id
                              ? "bg-blue-600 self-end ml-auto"
                              : "bg-gray-700 self-start"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      )
                  )}
                  <div ref={messageEndRef} />
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={currentMessage}
                    onChange={(e) => setCurMessage(e.target.value)}
                    className="flex-1 rounded px-4 py-2 bg-gray-800 text-white border border-gray-600 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center mt-16">
                Select a user to start chatting
              </div>
            )}
          </div>
        )}

        {/* User List */}
        <div className="col-span-1 p-6 overflow-y-auto border-l border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Other Users</h3>
          {otherUsers.length > 0 ? (
            otherUsers.map((users) => (
              <div
                onClick={() => fetchMessages(users)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 mb-3 rounded cursor-pointer transition"
                key={users._id}
              >
                {users.name}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Users Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
