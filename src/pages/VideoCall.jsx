import { useEffect, useRef, useState } from "react";

const VideoCall = ({ socket, onDisconnect, receiverId, currentUserId, isCaller }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [callStarted, setCallStarted] = useState(false);

  const cleanupMedia = () => {
    if (peerConnection.current) peerConnection.current.close();
    peerConnection.current = null;

    [localVideoRef, remoteVideoRef].forEach(ref => {
      if (ref.current?.srcObject) {
        ref.current.srcObject.getTracks().forEach(track => track.stop());
        ref.current.srcObject = null;
      }
    });
  };

  const handleDisconnect = () => {
    cleanupMedia();
    socket.emit("disconnect-call", { to: receiverId });
    onDisconnect();
  };

  // ✅ Start WebRTC only when both are ready (after call accepted)
  useEffect(() => {
    const startWebRTC = async () => {
      try {
        console.log("🎥 Starting media...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection();

        // Add local tracks
        stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

        // Handle remote stream
        peerConnection.current.ontrack = event => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Handle ICE candidates
        peerConnection.current.onicecandidate = event => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              target: receiverId,
              candidate: event.candidate,
            });
          }
        };

        // Caller creates offer
        if (isCaller) {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.emit("offer", { target: receiverId, offer, sender: currentUserId });
        }

        setCallStarted(true);
      } catch (err) {
        console.error("Media setup error:", err);
      }
    };

    startWebRTC();

    // Listen for remote answer
    socket.on("answer", async ({ answer }) => {
      try {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (err) {
        console.log("Answer error:", err);
      }
    });

    // Listen for remote offer (if you’re the receiver)
    socket.on("offer", async ({ offer, sender }) => {
      try {
        peerConnection.current = new RTCPeerConnection();

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

        peerConnection.current.ontrack = event => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        peerConnection.current.onicecandidate = event => {
          if (event.candidate) {
            socket.emit("ice-candidate", { target: sender, candidate: event.candidate });
          }
        };

        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("answer", { target: sender, answer });

        setCallStarted(true);
      } catch (err) {
        console.error("Offer handling error:", err);
      }
    });

    // ICE candidates
    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.log("ICE error:", err);
      }
    });

    // If remote disconnects
    socket.on("disconnect-call", () => {
      console.log("📴 Remote disconnected");
      cleanupMedia();
      onDisconnect();
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("disconnect-call");
      cleanupMedia();
    };
  }, [socket, receiverId, currentUserId, isCaller]);

  return (
    <div className="text-center">
      <h2 className="text-xl text-green-400 mb-4">Video Call</h2>
      <div className="flex justify-center space-x-6">
        <video ref={localVideoRef} autoPlay playsInline muted className="rounded w-1/3 border" />
        <video ref={remoteVideoRef} autoPlay playsInline className="rounded w-1/3 border" />
      </div>

      <button
        onClick={handleDisconnect}
        className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
      >
        End Call
      </button>
    </div>
  );
};

export default VideoCall;
