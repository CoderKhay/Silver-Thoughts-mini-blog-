import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./LoginStateTracker/CreateAuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase-config";

const Layout = () => {
  const useAuth = useContext(AuthContext);
  console.log(useAuth);

  const navigate = useNavigate();

  //Logout users
  const signUserOut = async () => {
    signOut(auth).then(() => {
      useAuth.currentUser = null;
      useAuth.loading = false;
      navigate("/");
    });
  };

  return (
    <div className="h-full bg-[rgb(250,247,242)]">
      <div className="bg-[rgb(239,230,216)] shadow-lg text-black p-2 pl-5 h-11 mb-5 flex space-x-10 fixed w-full">
        <h1 className="font-medium text-xl text-[#42582a]">Silver Thoughts</h1>
        <nav className="space-x-4">
          <Link to=".">Home</Link>
          {!useAuth.currentUser ? (
            <Link to="signin">Sign In</Link>
          ) : (
            <button onClick={signUserOut} className="cursor-pointer">
              Log out
            </button>
          )}
          {useAuth.currentUser && <Link to="createpost">Create Post</Link>}
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
