import { auth } from "../../Config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../LoginStateTracker/CreateAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const useAuth = useContext(AuthContext);
  console.log(useAuth);

  if (useAuth.currentUser) {
    console.log("You are wonderful kamaldeen");
  }
  //Sign up for new user
  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log("User signed up");
    } catch (error) {
      if (error === "auth/email-already-in-use") {
        alert("This email is already registered!");
      } else if (error === "auth/weak-password") {
        alert("Password should be at least 6 characters");
      } else if (error === "auth/invalid-email") {
        alert("Invalid email address");
      } else {
        alert("Error: " + error);
      }
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mt-13 bg-[rgb(239,230,216)] w-90 h-90 shadow-lg rounded-md p-5">
        <h2 className="text-3xl font-medium mb-5">Hello There</h2>
        <label htmlFor="mail">Email</label>
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
        <label htmlFor="userpassword">Password</label>
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
          className="bg-[#42582a] hover:bg-[#42582a]/96 mt-8 w-full p-2 rounded-md text-white cursor-pointer"
          onClick={signUp}
        >
          Sign Up
        </button>
        <p className="text-xs mt-4 text-center font-semibold cursor-default">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#42582a] font-bold cursor-pointer hover:text-[#42582a]/70"
          >
            click here to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
