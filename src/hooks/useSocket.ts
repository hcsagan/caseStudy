import io from "socket.io-client";
import { useState, useEffect } from "react";

export enum SocketStatus {
  Loading = 0,
  Connected = 1,
  ConnectionError = 2,
  ConnectionFailed = 3,
  Disconnected = 4,
}

const useSocket = () => {
  const [status, setStatus] = useState<number>(SocketStatus.Loading);
  const [newUser, setNewUser] = useState();

  // Initialization and setup the socket
  useEffect(() => {
    const socket = io("https://case-study.adaptable.app/");

    socket.once("connect", () => setStatus(SocketStatus.Connected));
    socket.on("connect_error", () => setStatus(SocketStatus.ConnectionError));
    socket.on("connect_failed", () => setStatus(SocketStatus.ConnectionFailed));
    socket.on("disconnect", () => setStatus(SocketStatus.Disconnected));
    
    socket.connected ? setStatus(SocketStatus.Connected) : socket.connect();


    socket.on("userList", ({ results, info }) => {
      if (results[0] !== newUser) setNewUser({ ...results[0], key: info.seed });
    });

    //cleaning the listeners and setting status to disconnected.
    return () => {
      socket.disconnect();
      
      setStatus(SocketStatus.Disconnected);
    };
  }, []);

  return { status, newUser };
};

export default useSocket;
