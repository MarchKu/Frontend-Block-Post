import { Link } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";
import { ToastContainer } from "react-toastify";

function EditPostPage() {
  return (
    <>
      <section className="w-full min-h-screen h-auto px-[5%] py-[1.5rem] flex flex-col items-center ">
        <div className="size-full  max-w-[1440px] flex flex-col gap-[1.5rem]">
          <h1 className="text-[3rem] font-semibold">Edit Post Page</h1>
          <EditPostForm />
          <Link to="/" className="text-center hover:underline">Back to Home</Link>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
}

export default EditPostPage;
