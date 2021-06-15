import "./post-snippet.css";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserId } from "../../../user/userSlice";
import {
  LikePost,
  ClapReaction,
  LoveReaction,
  CareReaction,
} from "./PostActions";

export const PostSnippet = React.forwardRef(
  ({ post, heightFullContent }, ref) => {
    const userId = useSelector(getUserId);
    const navigate = useNavigate();

    return (
      <div
        className="p-4 w-80 max-w-sm border-blue-200 border-2 my-4 rounded flex flex-col relative bg-white"
        style={{
          height: heightFullContent ? "auto" : "15rem",
          minHeight: heightFullContent ? "15rem" : "",
        }}
        ref={ref}
      >
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => {
            if (post.author._id === userId) {
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
          <div className="ml-3 flex-col">
            <div className="font-semibold">{post.author.name}</div>
            <div className="text-gray-400 -mt-1 -ml-1 text-sm">
              @{post.author.username}
            </div>
          </div>
        </div>
        <div
          className={
            heightFullContent ? "flex-grow mb-4" : "flex-grow module line-clamp"
          }
          onClick={() => navigate(`/post/${post._id}`)}
        >
          {post.content}
        </div>
        <div className="flex justify-evenly">
          <LikePost post={post} />
          <ClapReaction post={post} />
          <LoveReaction post={post} />
          <CareReaction post={post} />
        </div>
      </div>
    );
  }
);
