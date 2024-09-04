import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePosts from "../hooks/usePosts";

function EditPostForm() {
  const params = useParams();

  const { post, getPostById, updatePostById, isLoading } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getPostById(params.postId);
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.post_title);
      setContent(post.post_content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      id: params.postId,
      title,
      content,
    };
    updatePostById(updateData);
  };
  return (
    <form
      className="size-full flex flex-col gap-[1.5rem]"
      onSubmit={handleSubmit}
    >
      <div className="border p-[1rem] flex flex-col gap-[1rem]">
        <h1 className="text-[2rem] font-semibold ">Edit Post Form</h1>
        <hr />
        <label className="w-full h-auto flex gap-[1rem]">
          <p className="w-[60px]">Title</p>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="w-full border px-[1rem]"
          />
        </label>
        <label className="w-full h-auto flex gap-[1rem]">
          <p className="w-[60px]">Content</p>
          <textarea
            id="content"
            name="content"
            type="text"
            placeholder="Enter content here"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            rows={8}
            cols={30}
            className="w-full border px-[1rem]"
          />
        </label>
        <div className="w-full text-right ">
          <button
            type="submit"
            className="bg-green-500 p-[0.5rem] w-[180px] font-semibold hover:bg-green-600"
          >
            {isLoading ? (
              <div>
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                ></div>
                <span className="ml-2">Processing...</span>
              </div>
            ) : (
              <span className="ml-2">Update</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditPostForm;
