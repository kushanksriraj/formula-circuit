import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../../user/userSlice";
import {
  getLoadingStatus,
  reactToPostAsync,
  unReactToPostAsync,
} from "../../../postSlice";

export const ClapReaction = ({ post }) => {
  const [clapLoading, setClapLoading] = useState(false);
  const dispatch = useDispatch();
  const postLoading = useSelector(getLoadingStatus);
  const userId = useSelector(getUserId);

  return (
    <div
      className="w-12 h-8 flex items-center justify-center rounded-md"
      style={{
        backgroundColor: post.reactions.claps.includes(userId)
          ? "lightblue"
          : "lightgray",
      }}
      onClick={() => {
        if (!postLoading && post.reactions.claps.includes(userId)) {
          setClapLoading(true);
          dispatch(
            unReactToPostAsync({ postId: post._id, type: "claps" })
          ).then(() => setClapLoading(false));
        } else if (!postLoading) {
          setClapLoading(true);
          dispatch(reactToPostAsync({ postId: post._id, type: "claps" })).then(
            () => setClapLoading(false)
          );
        }
      }}
    >
      {clapLoading ? (
        <div className="material-icons-sharp spin__modal text-md text-white">
          sync
        </div>
      ) : (
        <span className="font-semibold text-blue-700">
          👏{" "}
          {post.reactions.claps.length > 0 ? post.reactions.claps.length : ""}
        </span>
      )}
    </div>
  );
};
