import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebase-config";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log("User signed in");
    } catch (error) {
      switch (error) {
        case "auth/invalid-email":
          alert("Invalid email address format");
          navigate("/");
          break;

        case "auth/user-disabled":
          alert("This account has been disabled");
          break;

        case "auth/user-not-found":
          alert("No account found with this email");
          break;

        case "auth/wrong-password":
          alert("Incorrect password");
          break;

        case "auth/invalid-credential":
          alert("Invalid email or password");
          break;

        case "auth/too-many-requests":
          alert("Too many failed attempts. Please try again later");
          break;

        case "auth/network-request-failed":
          alert("Network error. Check your internet connection");
          break;

        case "auth/operation-not-allowed":
          alert("Email/password sign-in is not enabled");
          break;

        default:
          alert("An error occurred. Please try again or try signing up");
          console.error("Sign in error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mt-13 bg-white/70 backdrop-blur-xl rounded-xl w-90 h-95 shadow-xl border border-white/40 p-5">
        <h2 className="text-3xl font-medium mb-2 font-['Playfair_Display']">Welcome back</h2>
        <p className="text-md text-gray-500 mb-3">
          Sign in to your account to continue
        </p>
        <label htmlFor="mail" className="text-sm">Email</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="example12@gmail.com..."
          id="mail"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#D8CFC4] w-full rounded-sm mt-2 mb-1 p-1 bg-white/50 outline-none placeholder:text-xs placeholder:italic"
        />
        <br />
        <label htmlFor="userpassword" className="text-sm">Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password..."
          id="userpassword"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-[#D8CFC4] w-full rounded-sm mt-2 mb-1 p-1 bg-white/50 outline-none placeholder:text-xs placeholder:italic"
        />
        <br />
        <button
          type="button"
          className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:scale-[1.02] transition shadow-lg mt-8 w-full p-2 rounded-md text-white cursor-pointer"
          onClick={signIn}
        >
          Sign In
        </button>

        <p className="text-xs mt-4 text-center font-semibold cursor-default">
          New here?{" "}
          <Link
            to="/signup"
            className="text-[#42582a] font-bold cursor-pointer hover:text-[#42582a]/70"
          >
create an account with any email and password         
 </Link>
        </p>
      </div>
    </div>
  );
};

export default SignOut;
