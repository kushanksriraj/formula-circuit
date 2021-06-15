import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../../user/userSlice";
import {
  getLoadingStatus,
  reactToPostAsync,
  unReactToPostAsync,
} from "../../../postSlice";

export const LoveReaction = ({ post }) => {
  const [loveLoading, setLoveLoading] = useState(false);
  const dispatch = useDispatch();
  const postLoading = useSelector(getLoadingStatus);
  const userId = useSelector(getUserId);

  return (
    <div
      className="w-12 h-8 flex items-center justify-center rounded-md"
      style={{
        backgroundColor: post.reactions.love.includes(userId)
          ? "lightblue"
          : "lightgray",
      }}
      onClick={() => {
        if (!postLoading && post.reactions.love.includes(userId)) {
          setLoveLoading(true);
          dispatch(unReactToPostAsync({ postId: post._id, type: "love" })).then(
            () => setLoveLoading(false)
          );
        } else if (!postLoading) {
          setLoveLoading(true);
          dispatch(reactToPostAsync({ postId: post._id, type: "love" })).then(
            () => setLoveLoading(false)
          );
        }
      }}
    >
      {loveLoading ? (
        <div className="material-icons-sharp spin__modal text-md text-white">
          sync
        </div>
      ) : (
        <span className="font-semibold text-blue-700">
          💕 {post.reactions.love.length > 0 ? post.reactions.love.length : ""}
        </span>
      )}
    </div>
  );
};
