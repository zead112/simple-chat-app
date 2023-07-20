import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Chat({ room }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app  flex-col">
      <div className="header bg-blue-600 text-4xl">
        <h1 className="py-2">Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages bg-gray-200">
        {messages.map((message) => (
          <div key={message.id} className="message text-2xl">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="new-message-form bg-grey-200 my-2 "
      >
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input w-80-percent border border-gray-400 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-2"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          className="send-button bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded "
        >
          Send
        </button>
      </form>
    </div>
  );
}
export default Chat;
