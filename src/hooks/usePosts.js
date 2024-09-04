import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const usePosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getPosts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(`https://fullstack-block-post-project-server.vercel.app/api/posts`);
      setPosts(results.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.delete(`https://fullstack-block-post-project-server.vercel.app/api/posts/${postId}`);
      const newPosts = posts.filter((post) => {
        return post.post_id !== postId;
      });
      setPosts(newPosts);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getPostById = async (postId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(`https://fullstack-block-post-project-server.vercel.app/api/posts/${postId}`);
      setPost(result.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const createPost = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.post(`https://fullstack-block-post-project-server.vercel.app/api/posts`, data);
      setIsLoading(false);
      toast.success("Post update successfully.");
      setTimeout(function () {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Fail to update.");
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updatePostById = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(`https://fullstack-block-post-project-server.vercel.app/api/posts/${data.id}`, data);
      setIsLoading(false);
      toast.success("Post update successfully.");
      setTimeout(function () {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Fail to update.");
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    posts,
    totalPages,
    post,
    getPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePost,
    isError,
    isLoading,
  };
};

export default usePosts;
