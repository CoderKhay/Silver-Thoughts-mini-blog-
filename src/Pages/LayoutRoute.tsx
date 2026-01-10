import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./LoginStateTracker/CreateAuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase-config";

const Layout = () => {
  const useAuth = useContext(AuthContext);

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
    <div className="min-h-[70vh] bg-linear-to-br from-slate-100 to-emerald-50 relative ">
      <div className="fixed z-10 top-0 text-black p-2 pl-5 h-11 mb-5 flex space-x-10 w-full   backdrop-blur-md bg-white/70 shadow-sm">
        <h1 className="font-medium text-xl text-[#42582a] font-['Playfair_Display']">
          SilverThoughts
        </h1>
        <nav className="space-x-4 text-sm mt-1">
          <Link to=".">Home</Link>
          {/* only logged in users should be able to see the logout button */}
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
