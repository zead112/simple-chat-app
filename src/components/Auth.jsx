import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function Auth({ props }) {
  const setIsAuth = props;
  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth text-center">
      <p className="text-white bg-black text-3xl rounded-lg mb-4 py-4">
        Sign in with Google to continue
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={() => {
          signInwithGoogle();
        }}
      >
        Sign in
      </button>
    </div>
  );
}

export default Auth;
