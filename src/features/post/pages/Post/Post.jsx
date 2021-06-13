import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getUserId } from "../../../user/userSlice";
import { EditPost } from "./EditPost";
import {
  getLoadingStatus,
  likePostAsync,
  reactToPostAsync,
  unlikePostAsync,
  unReactToPostAsync,
} from "../../postSlice";

export const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const _id = useSelector(getUserId);
  const postLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const mountRef = useRef({ isMounted: false });

  useEffect(() => {
    mountRef.current.isMounted = true;
    (async () => {
      mountRef.current.isMounted && setLoading(true);
      const res = await axios.get(`post/${id}`);
      if (res.data.success) {
        mountRef.current.isMounted && setPost(res.data.post);
      }
      mountRef.current.isMounted && setLoading(false);
    })();
    return () => (mountRef.current.isMounted = false); // eslint-disable-line react-hooks/exhaustive-deps
  }, [id, postLoading]);

  return (
    <div className="flex flex-col items-center">
      {loading && <div>Loading...</div>}
      <div className="p-4 h-96 w-80 max-w-sm border-blue-200 border-2 my-8 rounded flex flex-col relative">
        <div className="flex items-center mb-6">
          <img
            className="rounded-full w-10"
            src={post?.author.profileURL}
            alt={post?.author.name}
            loading="lazy"
          />
          <div className="ml-4 flex-col">
            <div className="font-semibold">{post?.author.name}</div>
            <div className="text-gray-400 -mt-1">@{post?.author.username}</div>
          </div>
        </div>
        <div
          className="flex-grow"
          onClick={() => navigate(`/post/${post?._id}`)}
        >
          {post?.content}
        </div>
        <div className="flex justify-evenly">
          <div
            onClick={() => {
              if (post?.likedBy.includes(_id)) {
                !postLoading &&
                  dispatch(unlikePostAsync({ postId: post?._id }));
              } else {
                !postLoading && dispatch(likePostAsync({ postId: post?._id }));
              }
            }}
          >
            👍 {post?.likedBy.length} {post?.likedBy.includes(_id) && "YOU"}
          </div>
          <div
            onClick={() => {
              if (post?.reactions.claps.includes(_id)) {
                !postLoading &&
                  dispatch(
                    unReactToPostAsync({ postId: post?._id, type: "claps" })
                  );
              } else {
                !postLoading &&
                  dispatch(
                    reactToPostAsync({ postId: post?._id, type: "claps" })
                  );
              }
            }}
          >
            👏 {post?.reactions.claps.length}{" "}
            {post?.reactions.claps.includes(_id) && "YOU"}
          </div>
          <div
            onClick={() => {
              if (post?.reactions.love.includes(_id)) {
                !postLoading &&
                  dispatch(
                    unReactToPostAsync({ postId: post?._id, type: "love" })
                  );
              } else {
                !postLoading &&
                  dispatch(
                    reactToPostAsync({ postId: post?._id, type: "love" })
                  );
              }
            }}
          >
            💕 {post?.reactions.love.length}{" "}
            {post?.reactions.love.includes(_id) && "YOU"}
          </div>
          <div
            onClick={() => {
              if (post?.reactions.care.includes(_id)) {
                !postLoading &&
                  dispatch(
                    unReactToPostAsync({ postId: post?._id, type: "care" })
                  );
              } else {
                !postLoading &&
                  dispatch(
                    reactToPostAsync({ postId: post?._id, type: "care" })
                  );
              }
            }}
          >
            🤗 {post?.reactions.care.length}{" "}
            {post?.reactions.care.includes(_id) && "YOU"}
          </div>
        </div>
        {post?.author._id === _id && (
          <div
            className="absolute top-2 right-2"
            onClick={() => setShowEditPostModal(true)}
          >
            Edit
          </div>
        )}
      </div>
      {showEditPostModal && (
        <EditPost setShowEditPostModal={setShowEditPostModal} post={post} />
      )}
    </div>
  );
};
