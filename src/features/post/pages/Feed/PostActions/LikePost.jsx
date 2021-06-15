import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../../user/userSlice";
import {
  getLoadingStatus,
  likePostAsync,
  unlikePostAsync,
} from "../../../postSlice";

export const LikePost = ({ post }) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const userId = useSelector(getUserId);
  const postLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();

  return (
    <div
      className="w-12 h-8 flex items-center justify-center rounded-md"
      style={{
        backgroundColor: post.likedBy.includes(userId)
          ? "lightblue"
          : "lightgray",
      }}
      onClick={() => {
        if (!postLoading && post.likedBy.includes(userId)) {
          setLikeLoading(true);
          dispatch(unlikePostAsync({ postId: post._id })).then(() =>
            setLikeLoading(false)
          );
        } else if (!postLoading) {
          setLikeLoading(true);
          dispatch(likePostAsync({ postId: post._id })).then(() =>
            setLikeLoading(false)
          );
        }
      }}
    >
      {likeLoading ? (
        <div className="material-icons-sharp spin__modal text-md text-white">
          sync
        </div>
      ) : (
        <span className="font-semibold text-blue-700">
          👍 {post.likedBy.length > 0 ? post.likedBy.length : ""}
        </span>
      )}
    </div>
  );
};
