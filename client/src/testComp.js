import React, { useEffect, useState } from "react";
import LoudSocket from "./websocket";
console.log("socket imported into TestComp");

const WebSocketComponent = () => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = new LoudSocket("ws://localhost:8000", {
      transports: ["websocket"],
      autoConnect: false,
    });
    setSocket(socket);

    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("echo", (data) => {
      console.log("echo", data);
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  return (
    <div>
      WebSocket Component
      <button
        onClick={() => {
          socket.emit("hello", "hello world", (response) => {
            console.log(response); // ok
          });
        }}
      >
        hello
      </button>
    </div>
  );
};

export default WebSocketComponent;
