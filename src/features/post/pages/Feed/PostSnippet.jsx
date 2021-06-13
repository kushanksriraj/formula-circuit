import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserId } from "../../../user/userSlice";
import {
  getLoadingStatus,
  likePostAsync,
  reactToPostAsync,
  unlikePostAsync,
  unReactToPostAsync,
} from "../../postSlice";

export const PostSnippet = React.forwardRef(({ post }, ref) => {
  const dispatch = useDispatch();
  const _id = useSelector(getUserId);
  const postLoading = useSelector(getLoadingStatus);
  const navigate = useNavigate();
  // have loading state for each postSnippet and disable the buttons on loading state

  return (
    <div
      className="p-4 h-60 w-80 max-w-sm border-blue-200 border-2 my-4 rounded flex flex-col relative"
      ref={ref}
    >
      <div
        className="flex items-center mb-6 cursor-pointer"
        onClick={() => {
          if (post.author._id === _id) {
            navigate("/profile");
          } else {
            navigate(`/user/${post.author.username}/profile`);
          }
        }}
      >
        <img
          className="rounded-full w-10"
          src={post.author.profileURL}
          alt={post.author.name}
          loading="lazy"
        />
        <div className="ml-4 flex-col">
          <div className="font-semibold">{post.author.name}</div>
          <div className="text-gray-400 -mt-1">@{post.author.username}</div>
        </div>
      </div>
      <div className="flex-grow" onClick={() => navigate(`/post/${post._id}`)}>
        {post.content}
      </div>
      <div className="flex justify-evenly">
        <div
          onClick={() => {
            if (post.likedBy.includes(_id)) {
              !postLoading && dispatch(unlikePostAsync({ postId: post._id }));
            } else {
              !postLoading && dispatch(likePostAsync({ postId: post._id }));
            }
          }}
        >
          👍 {post.likedBy.length} {post.likedBy.includes(_id) && "YOU"}
        </div>
        <div
          onClick={() => {
            if (post.reactions.claps.includes(_id)) {
              !postLoading &&
                dispatch(
                  unReactToPostAsync({ postId: post._id, type: "claps" })
                );
            } else {
              !postLoading &&
                dispatch(reactToPostAsync({ postId: post._id, type: "claps" }));
            }
          }}
        >
          👏 {post.reactions.claps.length}{" "}
          {post.reactions.claps.includes(_id) && "YOU"}
        </div>
        <div
          onClick={() => {
            if (post.reactions.love.includes(_id)) {
              !postLoading &&
                dispatch(
                  unReactToPostAsync({ postId: post._id, type: "love" })
                );
            } else {
              !postLoading &&
                dispatch(reactToPostAsync({ postId: post._id, type: "love" }));
            }
          }}
        >
          💕 {post.reactions.love.length}{" "}
          {post.reactions.love.includes(_id) && "YOU"}
        </div>
        <div
          onClick={() => {
            if (post.reactions.care.includes(_id)) {
              !postLoading &&
                dispatch(
                  unReactToPostAsync({ postId: post._id, type: "care" })
                );
            } else {
              !postLoading &&
                dispatch(reactToPostAsync({ postId: post._id, type: "care" }));
            }
          }}
        >
          🤗 {post.reactions.care.length}{" "}
          {post.reactions.care.includes(_id) && "YOU"}
        </div>
      </div>
      {post.author._id === _id && (
        <div className="absolute top-2 right-2">Edit</div>
      )}
    </div>
  );
});
