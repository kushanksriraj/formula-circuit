import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../user/userSlice";
import { createPostAsync } from "../../postSlice";

export const CreatePost = ({ setShowCreatePostModal }) => {
  const [content, setContent] = useState("");
  const _id = useSelector(getUserId);
  const dispatch = useDispatch();

  const postOnClick = async () => {
    dispatch(createPostAsync({ content, author: _id })).then(() =>
      setShowCreatePostModal(false)
    );
  };

  return (
    <div className="fixed h-screen w-screen bg-gray-200 bg-opacity-90 flex justify-center">
      <div className="relative w-full h-3/4 p-4 pt-8 mt-8">
        <div
          className="absolute right-4 top-2"
          onClick={() => setShowCreatePostModal(false)}
        >
          X
        </div>
        <textarea
          className="p-2 w-full h-48"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div
          onClick={postOnClick}
          className="rounded-full h-10 w-20 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Tweet
        </div>
      </div>
    </div>
  );
};
