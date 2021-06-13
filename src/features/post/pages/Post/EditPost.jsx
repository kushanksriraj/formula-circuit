import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deletePostAsync, savePostAsync } from "../../postSlice";

export const EditPost = ({ setShowEditPostModal, post }) => {
  const [content, setContent] = useState(post.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveOnClick = async () => {
    dispatch(savePostAsync({ content, postId: post._id })).then(() =>
      setShowEditPostModal(false)
    );
  };

  const deleteOnClick = async () => {
    dispatch(deletePostAsync({ postId: post._id })).then(() => {
      setShowEditPostModal(false);
      navigate("/feed", { replace: true });
    });
  };

  return (
    <div className="fixed h-screen w-screen bg-gray-200 bg-opacity-90 flex justify-center">
      <div className="relative w-full h-3/4 p-4 pt-8 mt-8">
        <div
          className="absolute right-4 top-2"
          onClick={() => setShowEditPostModal(false)}
        >
          X
        </div>
        <textarea
          value={content}
          className="p-2 w-full h-48"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div
          onClick={saveOnClick}
          className="rounded-full h-10 w-20 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Save
        </div>
        <div
          onClick={deleteOnClick}
          className="rounded-full h-10 w-20 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Delete
        </div>
      </div>
    </div>
  );
};
