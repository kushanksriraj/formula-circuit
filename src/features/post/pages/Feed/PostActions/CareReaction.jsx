import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../../user/userSlice";
import {
  getLoadingStatus,
  reactToPostAsync,
  unReactToPostAsync,
} from "../../../postSlice";

export const CareReaction = ({ post }) => {
  const [careLoading, setCareLoading] = useState(false);
  const dispatch = useDispatch();
  const postLoading = useSelector(getLoadingStatus);
  const userId = useSelector(getUserId);

  return (
    <div
      className="w-12 h-8 flex items-center justify-center rounded-md"
      style={{
        backgroundColor: post.reactions.care.includes(userId)
          ? "lightblue"
          : "lightgray",
      }}
      onClick={() => {
        if (!postLoading && post.reactions.care.includes(userId)) {
          setCareLoading(true);
          dispatch(unReactToPostAsync({ postId: post._id, type: "care" })).then(
            () => setCareLoading(false)
          );
        } else if (!postLoading) {
          setCareLoading(true);
          dispatch(reactToPostAsync({ postId: post._id, type: "care" })).then(
            () => setCareLoading(false)
          );
        }
      }}
    >
      {careLoading ? (
        <div className="material-icons-sharp spin__modal text-md text-white">
          sync
        </div>
      ) : (
        <span className="font-semibold text-blue-700">
          🤗 {post.reactions.care.length > 0 ? post.reactions.care.length : ""}
        </span>
      )}
    </div>
  );
};
