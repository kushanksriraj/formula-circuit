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
  ({ post, heightFullContent, setShowEditPostModal }, ref) => {
    const userId = useSelector(getUserId);
    const navigate = useNavigate();

    return (
      <div
        className="p-4 w-80 max-w-md border-blue-200 border-2 my-4 rounded flex flex-col relative bg-white md:w-full md:max-w-xl"
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
            heightFullContent
              ? "flex-grow mb-4"
              : "flex-grow module line-clamp cursor-pointer md:px-12"
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

        {post?.author._id === userId && heightFullContent && (
          <div
            className="absolute top-2 right-2 material-icons-sharp text-4xl text-blue-400 cursor-pointer"
            onClick={() => setShowEditPostModal(true)}
          >
            edit_note
          </div>
        )}
      </div>
    );
  }
);
