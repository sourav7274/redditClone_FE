import { useEffect, useRef } from "react";

const VideoCall = ({ socket, onDisconnect, receiverId, currentUserId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  const handleDisconnect = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }

    socket.emit("disconnect-call", { to: receiverId });
    onDisconnect(); // this might navigate away or close the call UI
  };

  useEffect(() => {
   
    const setupMedia = async () => {
      try {
        console.log("Requesting camera & mic...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("Got stream!", stream);

        localVideoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection();

        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
        // Handle remote stream
        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // ICE candidates
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              target: receiverId,
              candidate: event.candidate,
            });
          }
        };

        // Create offer
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", {
          target: receiverId,
          offer,
          sender: currentUserId,
        });
      } catch (err) {
        console.log(err);
      }
    };
    setupMedia();

    //Listen for answer
    socket.on("answer", async ({ answer }) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    //Listen for ICE candidates
    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (err) {
        console.log("ICE", err);
      }
    });

    socket.on("disconnect-call", () => {
      if (peerConnection.current) peerConnection.current.close();

      if (remoteVideoRef.current?.srcObject) {
        remoteVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        remoteVideoRef.current.srcObject = null;
      }

      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        localVideoRef.current.srcObject = null;
      }

      onDisconnect(); // Optional, if you want to auto-close the UI
    });

    return () => {
      if (socket) {
        socket.off("answer");
        socket.off("ice-candidate");
      }

      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [socket, receiverId, currentUserId]);

  useEffect(() => {
   

    socket.on("offer", async ({ offer, sender }) => {
      try {
        if (!peerConnection.current) {
          peerConnection.current = new RTCPeerConnection();
        }

        console.log("Requesting camera & mic...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("Got stream!", stream);

        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0]; // ✅ fixed here
          }
        };

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              target: sender,
              candidate: event.candidate,
            });
          }
        };

        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer); // 🧠 this was missing

        socket.emit("answer", {
          target: sender,
          answer,
        });
      } catch (err) {
        console.log("Offer", err);
      }
    });

    return () => {
      socket.off("offer");
    };
  }, [socket]);

  return (
    <>
      <div>
        <h2 className="text-xl text-green-400 mb-4">Video Chat</h2>
        <div className="flex space-x-4 w-full">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="rounded w-1/4 border"
          />
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="rounded w-1/2 border"
          />
        </div>
        <button
          onClick={() => {
            onDisconnect(), handleDisconnect();
          }}
          className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
        >
          Disconnect
        </button>
      </div>
    </>
  );
};

export default VideoCall;
