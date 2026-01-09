import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Config/firebase-config";
import { useContext } from "react";
import { AuthContext } from "./LoginStateTracker/CreateAuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postThought, setPostThought] = useState("");

  const useAuth = useContext(AuthContext);

  const blogCollection = collection(db, "Blog");

  const navigate = useNavigate();

  const createPost = async () => {
    await addDoc(blogCollection, {
      title,
      postThought,
      author: {
        name: useAuth.currentUser?.email,
        id: useAuth.currentUser?.uid,
      },
    });
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mt-13 bg-white/70 backdrop-blur-xl rounded-xl w-90 h-90 shadow-xl border border-white/40 p-5">
        <h1 className="text-center text-xl font-medium">Post a Thought</h1>
        <div>
          <label htmlFor="postHeading">Title:</label>
          <br />
          <input
            type="text"
            name="postHeading"
            placeholder="title..."
            className="border border-[#D8CFC4] w-full rounded-sm mt-2 mb-1 p-1 bg-white/50 outline-none placeholder:text-xs placeholder:italic"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="thoughtcreation">Post:</label>
          <br />
          <textarea
            name="thoughtcreation"
            placeholder="Eager to hear your thought..."
            className="border border-[#D8CFC4] w-full h-25 rounded-sm mt-2 mb-1 p-1 bg-white/50 outline-none placeholder:text-xs placeholder:italic"
            onChange={(e) => setPostThought(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:scale-[1.02] transition shadow-lg mt-2 w-full p-2 rounded-md text-white cursor-pointer"
          onClick={createPost}
        >
          Submit Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
