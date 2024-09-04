import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/authentication";
import usePosts from "../hooks/usePosts";
import getPublishedDate from "../utils/getPublishedDate";
import { Link } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [keywords, setKeywords] = useState("");
  const { posts, getPosts, deletePost, isError, isLoading } = usePosts();

  const dateCalculate = (date) => {
    const currentDate = new Date();
    const newDate = new Date(date);
    const postDate =
      Math.floor((currentDate - newDate) / (1000 * 60 * 60 * 24)) - 5;
    if (postDate < 1) {
      return "today";
    } else if (postDate > 1 && postDate <=2 ) {
      return "yesterday";
    } else if(postDate > 1)  {
      return `${postDate} ago `;
    } 

  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="w-full min-h-screen h-auto px-[5%] py-[1.5rem] flex flex-col items-center ">
      <div className="size-full  max-w-[1440px] flex flex-col gap-[1.5rem]">
        <h1 className="text-[3rem] font-semibold">Blog Post App</h1>
        <div className="w-full px-[1rem] py-[1rem] bg-slate-400 flex justify-between ">
          <label className="flex gap-[1.5rem] items-center font-semibold">
            Search post
            <input
              type="text"
              placeholder="Search by title"
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
              }}
              className="border pl-[0.5rem] font-normal"
            />
          </label>
          <div className="flex gap-[1.5rem]">
            <Link
              to="/post/create"
              className="w-[180px] bg-orange-500 rounded-lg p-2 font-semibold hover:bg-orange-600 text-center"
            >
              Create Post
            </Link>
            <button
              onClick={() => logout()}
              className="hover:underline font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="w-full h-[80vh] flex flex-col justify-start items-center gap-[1rem]">
          {!posts.length && !isLoading ? (
            <div className="size-full flex flex-col justify-center items-center">
              <h1>There is no block post.</h1>
            </div>
          ) : (
            posts.map((post) => {
              return (
                <div
                  key={post.post_id}
                  className="w-full flex justify-between p-[1rem] border"
                >
                  <div className="flex flex-col gap-[1rem]">
                    <h1 className="text-[2rem] hover:underline"><Link to={`/post/view/${post.post_id}`}>{post.post_title}</Link></h1>
                    <div className="flex gap-[1rem]">
                      <p>Post date : {dateCalculate(post.created_at)}</p>
                      <p className="pl-[1rem] border-l border-gray-500">Post by : {post.username} </p>
                    </div>
                  </div>
                  <div className="w-[10%] min-w-[98px] flex flex-col justify-between font-semibold">
                    <button
                      className="bg-green-500 hover:underline"
                      onClick={() => navigate(`/post/view/${post.post_id}`)}
                    >
                      View post
                    </button>
                    <button
                      className="bg-yellow-500 hover:underline"
                      onClick={() => navigate(`/post/edit/${post.post_id}`)}
                    >
                      Edit post
                    </button>
                    <button
                      className="bg-red-500 hover:underline"
                      onClick={() => deletePost(post.post_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {isError ? <h1>Request failed</h1> : null}
          {isLoading ? <h1>Loading ....</h1> : null}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
