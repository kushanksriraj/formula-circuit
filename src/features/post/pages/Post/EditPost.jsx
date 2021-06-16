import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button, LoadingModal } from "../../../../common/Components";
import { deletePostAsync, savePostAsync } from "../../postSlice";

export const EditPost = ({ setShowEditPostModal, post }) => {
  const [content, setContent] = useState(post.content);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => inputRef.current.focus(), []);

  const saveOnClick = async () => {
    setSaveLoading(true);
    dispatch(savePostAsync({ content, postId: post._id })).then(() =>
      setShowEditPostModal(false)
    );
  };

  const deleteOnClick = async () => {
    setDeleteLoading(true);
    dispatch(deletePostAsync({ postId: post._id })).then(() => {
      setShowEditPostModal(false);
      navigate("/feed", { replace: true });
    });
  };

  const disableBtn = content.length > 0 && content.length <= 350;
  const color = { color: content.length > 350 ? "red" : "" };

  return (
    <div className="fixed h-screen w-screen bg-gray-200 bg-opacity-95 flex justify-center md:px-80">
      <div className="relative w-full h-3/4 p-4 pt-8 mt-8 md:px-52">
        <div
          onClick={() => setShowEditPostModal(false)}
          className="material-icons-sharp absolute top-0 right-4 text-3xl bg-white rounded-full h-10 w-10 flex items-center justify-center p-2 text-blue-400 md:right-40 cursor-pointer"
        >
          clear
        </div>
        <div className="p-2 text-lg">Edit your post:</div>
        <div className="relative">
          <textarea
            ref={inputRef}
            value={content}
            className="p-3 w-full h-48 flex-1 appearance-none border border-transparent bg-white text-gray-700 placeholder-gray-400 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="absolute -bottom-6 bg-white shadow-xl px-2 rounded-md text-green-600 font-semibold">
            <span style={color}>{content.length}</span>
            /350
          </div>
        </div>

        <div className="flex justify-end pt-2 mt-3">
          <div className="flex justify-between w-44">
            <Button text="Save" callback={saveOnClick} disabled={!disableBtn} />
            <Button text="Delete" callback={deleteOnClick} />
          </div>
        </div>
      </div>
      {(saveLoading || deleteLoading) && (
        <LoadingModal text={saveLoading ? "Saving..." : "Deleting..."} />
      )}
    </div>
  );
};
