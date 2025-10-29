import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOtherUSers, fetchFriends } from "../features/userSlice";
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
  const friends = useSelector((state) => state.user.friends);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  const [connectDis, setConnectDIs] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [isReceivingCall, setIsReceivingCall] = useState(false);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchFriends(currentUser._id));
    }
  }, [dispatch, currentUser]);

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

  const startCall = () =>{
    console.log("yolo")
    socket.emit("call_user",{
      from:currentUser?._id,
      to:currentChat?._id,
      callerName: currentUser?.name
    })
    console.log("📞 Calling", currentChat.name);
  }

  useEffect(() => {
  socket.on("call_accepted", ({ by }) => {
    console.log("✅ Call accepted by", by);
    setConnectDIs(true); // Now caller can open VideoCall
  });

  socket.on("call_rejected", ({ by }) => {
    console.log("❌ Call rejected by", by);
    alert("Call was rejected.");
  });

  socket.on("disconnect_call", () => {
    console.log("📴 Call ended");
    setConnectDIs(false);
  });

  return () => {
    socket.off("call_accepted");
    socket.off("call_rejected");
    socket.off("disconnect_call");
  };
}, []);

useEffect(() => {
  if (!socket) return;

  socket.on("incoming_call", ({ from, callerName }) => {
    console.log("📞 Incoming call from", callerName);
    setIncomingCall({ from, callerName });
    setIsReceivingCall(true);
  });

  return () => {
    socket.off("incoming_call");
  };
}, [socket]);

  const acceptCall = () => {
    socket.emit("accept_call", { from: incomingCall.from, to: currentUser._id });
    setIsReceivingCall(false);
    setConnectDIs(true); // open VideoCall UI
  };

  const rejectCall = () => {
    console.log("call rejected")
    socket.emit("reject_call", { from: incomingCall.from, to: currentUser._id });
    setIsReceivingCall(false);
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
      {isReceivingCall && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
            <p className="text-lg mb-4">
              📞 {incomingCall.callerName} is calling you...
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={acceptCall}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={rejectCall}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
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
              isCaller={true} // if you know current user started the call
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
                    onClick={startCall}
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

        {/* Friends List */}
        <div className="col-span-1 p-6 overflow-y-auto border-l border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Friends</h3>
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <div
                onClick={() => fetchMessages(friend)}
                className={`px-4 py-3 mb-3 rounded cursor-pointer transition flex items-center space-x-3 ${
                  currentChat && currentChat._id === friend._id
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-l-4 border-blue-400"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
                key={friend._id}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentChat && currentChat._id === friend._id
                    ? "bg-white text-blue-600"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                }`}>
                  <span className="font-bold text-sm">
                    {friend.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <span className={`font-medium ${
                    currentChat && currentChat._id === friend._id
                      ? "text-white"
                      : "text-gray-200"
                  }`}>
                    {friend.name}
                  </span>
                  {currentChat && currentChat._id === friend._id && (
                    <div className="text-blue-200 text-xs">Active chat</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Friends Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
