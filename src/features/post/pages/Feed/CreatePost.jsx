import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, LoadingModal } from "../../../../common/Components";
import { getUserId } from "../../../user/userSlice";
import { createPostAsync, getLoadingStatus } from "../../postSlice";

export const CreatePost = ({ setShowCreatePostModal }) => {
  const [content, setContent] = useState("");
  const userId = useSelector(getUserId);
  const postLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  const postOnClick = async () => {
    dispatch(createPostAsync({ content, author: userId })).then(() =>
      setShowCreatePostModal(false)
    );
  };

  const disableBtn = content.length > 0 && content.length <= 350;
  const color = { color: content.length > 350 ? "red" : "" };

  return (
    <div className="fixed h-screen w-screen bg-gray-200 bg-opacity-95 flex justify-center">
      <div className="relative w-full h-3/4 p-4 pt-8 mt-8">
        <div
          onClick={() => setShowCreatePostModal(false)}
          className="material-icons-sharp absolute top-0 right-4 text-3xl bg-white rounded-full h-10 w-10 flex items-center justify-center p-2 text-blue-400"
        >
          clear
        </div>
        <div className="p-2 text-lg">Write your post below:</div>
        <div className="relative">
          <textarea
            ref={inputRef}
            className="p-3 w-full h-48 flex-1 appearance-none border border-transparent bg-white text-gray-700 placeholder-gray-400 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="absolute -bottom-6 bg-white shadow-xl px-2 rounded-md text-green-600 font-semibold">
            <span style={color}>{content.length}</span>
            /350
          </div>
        </div>
        <div className="flex justify-end pt-2 mt-3">
          <Button text="Tweet" callback={postOnClick} disabled={!disableBtn} />
        </div>
      </div>
      {postLoading && <LoadingModal text="Tweeting..." />}
    </div>
  );
};
