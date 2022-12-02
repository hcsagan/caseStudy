import io from "socket.io-client";
import { useState, useEffect } from "react";

export const Status = {
  Loading: 0,
  Connected: 1,
  ConnectionError: 2,
  Disconnected: 4,
};

const useSocket = () => {
  const [status, setStatus] = useState(Status.Loading);
  const [newUser, setNewUser] = useState();

  // Initialization and setup the socket
  useEffect(() => {
    const socket = io("https://wunder-provider.herokuapp.com");

    socket.once("connect", () => setStatus(Status.Connected));
    socket.on("connect_error", () => setStatus(Status.ConnectionError));
    socket.connected ? setStatus(Status.Connected) : socket.connect();

    // ! disabled these listeners due to performance issues
    //socket.on("connect_failed", () => setStatus(3));
    //socket.on("disconnect", () => setStatus(4));

    socket.on("userList", ({ results, info }) => {
      if (results[0] !== newUser) setNewUser({ ...results[0], key: info.seed });
    });

    //cleaning the listeners and setting status to disconnected.
    return () => {
      socket.disconnect();
      setStatus(Status.Disconnected);
    };
  }, []);

  return { status, newUser };
};

export default useSocket;
