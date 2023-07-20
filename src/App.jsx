import { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className="text-center ">
      {" "}
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room flex-col justify-center text-white bg-black text-xl rounded-lg mb-4 py-4 ">
          <label>Enter Room Name</label>
          <input
            className="block text-gray-700 text-sm font-bold  text-lg mb-2 w-1/2 mx-auto text-center rounded-lg"
            for="username"
            ref={roomInputRef}
            type="text"
          />
          <button
            className="mx-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>
        </div>
      )}
      <div className="sign-out">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => {
            signUserOut();
          }}
        >
          {" "}
          Sign out
        </button>
      </div>
    </div>
  );
}

export default App;
