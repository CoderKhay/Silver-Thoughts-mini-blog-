import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/LayoutRoute";
import Home from "./Pages/Home";
import SignUp from "./Pages/Authentication/SignUp";
import SignIn from "./Pages/Authentication/SignIn";
import CreatePost from "./Pages/CreatePost";
import NotFound from "./Pages/NotFound";

import { useState, useEffect } from "react";
import { auth } from "./Config/firebase-config"; // your firebase config
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { AuthContext } from "./Pages/LoginStateTracker/CreateAuthContext";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "createpost",
        element: <CreatePost />,
      },
    ],
  },
]);

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  return (
    <AuthContext value={{ currentUser, loading }}>
      <RouterProvider router={router} />
    </AuthContext>
  );
}

export default App;
