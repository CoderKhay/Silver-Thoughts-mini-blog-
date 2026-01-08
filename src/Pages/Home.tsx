import { Link } from "react-router-dom";
import { AuthContext } from "./LoginStateTracker/CreateAuthContext";
import { useContext, useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebase-config";
import { TrashIcon } from "lucide-react";

type dbObj = {
  author: {
    name: string;
    id: string;
  };
  id: string;
  postThought: string;
  title: string;
};

const Home = () => {
  const [posts, setPosts] = useState<dbObj[]>([]);
  const useAuth = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      const blogCollection = collection(db, "Blog");
      const data = await getDocs(blogCollection);
      const dataInfo = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as dbObj[];

      return setPosts(dataInfo);
    };
    getPosts();
  }, []);

  const deletePost = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) return;

    try {
      const blogDoc = doc(db, "Blog", id);
      await deleteDoc(blogDoc);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="p-10 text-center flex flex-col justify-center items-center gap-2 h-screen">
      {!useAuth.currentUser && (
        <>
          {" "}
          <p className="mb-5 text-md text-[#4A3F35] font-extrlight mt-10">
            Every thoughts has a story, we collect them - the quiet ones, loud
            ones, the beautiful and the broken. Step in, and let your thoughts
            find a voice.
          </p>
          <h1 className="text-2xl">
            Welcome to
            <span className="text-[#42582a] font-semibold">
              {" "}
              SilverThoughts
            </span>
          </h1>
          <br />
          {!useAuth.currentUser && (
            <Link
              to="signup"
              className="block bg-[#42582a]/60 text-white p-3 rounded-md font-semibold w-38 mb-5"
            >
              Get Started
            </Link>
          )}
        </>
      )}
      <h2 className="text-left w-full text-2xl text-[#4A3F35] font-semibold mt-10">
        Feautured Posts
      </h2>

      {posts.length == 0 ? (
        <p className="mt-10 text-gray-500">
          No posts yet, be the first to create one! sign In now!
        </p>
      ) : (
        <div className="flex flex-col gap-10 text-left flex-wrap">
          {posts.map((post) => (
            <div key={post.id} className="bg-[rgb(239,230,216)] p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h1 className="uppercase text-left font-medium mb-4">
                  {post.title}
                </h1>

                {useAuth.currentUser?.uid === post.author.id && (
                  <button className="mb-4" onClick={() => deletePost(post.id)}>
                    <TrashIcon className="h-4 mr-5 cursor-pointer" />
                  </button>
                )}
              </div>
              <div className="postTextContainer wrap-break-word h-auto max-h-75 w-90 overflow-hidden overflow-y-aut0">
                {post.postThought}
              </div>
              <h3 className="text-left font-medium mt-4">{post.author.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
