import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import getPublishedDate from "../utils/getPublishedDate";
import usePosts from "../hooks/usePosts";
import { Link } from "react-router-dom";

function ViewPostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { post, getPostById, isError, isLoading } = usePosts();

  const dateCalculate = (date) => {
    const currentDate = new Date();
    const newDate = new Date(date);
    const postDate = Math.floor(
      (currentDate - newDate) / (1000 * 60 * 60 * 24) - 5
    );
    if (postDate === 0) {
      return "today";
    } else if (postDate === 1) {
      return "yesterday";
    } else if (postDate > 1) {
      return `${postDate} days ago `;
    }
  };

  useEffect(() => {
    getPostById(params.postId);
  }, []);

  return (
    <div className="w-full min-h-screen h-auto px-[5%] py-[1.5rem] flex flex-col items-center ">
      <div className="size-full  max-w-[1440px] flex flex-col gap-[1.5rem]">
        <h1 className="text-[3rem] font-semibold">Post Page</h1>
        {isLoading ? <h1>Loading ....</h1> : null}
        {isError ? <h1>Request failed</h1> : null}
        {post && (
          <div className="size-full flex flex-col gap-[1.5rem]">
            <div className="border p-[1rem] flex flex-col gap-[1rem]">
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-1rem">
                  <h1 className="text-[2rem] font-semibold ">
                    {post.post_title}
                  </h1>
                  <div className="flex gap-[1rem]">
                    <p>Post date : {dateCalculate(post.created_at)}</p>
                    <p className="pl-[1rem] border-l border-gray-500">
                      by : {post.username}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <p>{post.post_content}</p>
            </div>
            <Link to="/" className="text-center hover:underline">Back to Home</Link>
          </div>
        )}
        <h2 className="text-[1rem] font-semibold ">Comment</h2>
        <div className="border p-[1rem] flex flex-col gap-[1rem]">
          <div className="w-full flex flex-col gap-[1rem]">
            <div className="flex gap-[1rem]">
              <p>By : asdasdadasdasd</p>
              <p className="pl-[1rem] border-l border-gray-500">
                Comment date : Today
              </p>
            </div>
          </div>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem tempore reiciendis labore nesciunt, nihil officiis
            quo similique! Possimus sunt aut sit nobis aliquam, quia, vero ex
            placeat ut ratione vitae.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewPostPage;
