"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "dotenv/config";

console.log("Connecting to:", process.env.NEXT_PUBLIC_SOCKET_IO);
const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO);

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setMyId(socket.id);
    });

    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <section className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col h-3/4">
        <h1 className="text-xl font-bold text-center mb-4">Chat Room</h1>
        <ul className="flex-1 overflow-y-auto space-y-2 p-2 flex flex-col">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`p-2 rounded-lg max-w-fit ${
                msg.id === myId
                  ? "bg-blue-500 self-end"
                  : "bg-gray-700 self-start"
              }`}
            >
              {msg.text}
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessage} className="flex gap-2 mt-2">
          <input
            className="flex-1 p-2 bg-gray-700 rounded-lg text-white outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
