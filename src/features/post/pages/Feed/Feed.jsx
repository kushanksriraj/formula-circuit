import { useSelector, useDispatch } from "react-redux";
import { getPostFeed, getFeedAsync } from "../../postSlice";
import { useEffect, useState, useRef, useCallback } from "react";
import { CreatePost } from "./CreatePost";
import { PostSnippet } from "./PostSnippet";

export const Feed = () => {
  const { postList, hasMore, postLoading } = useSelector(getPostFeed);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [ctr, setCtr] = useState(0);
  const dispatch = useDispatch();
  const observer = useRef();

  useEffect(() => {
    dispatch(getFeedAsync());
  }, [ctr, dispatch]);

  const lastPostElement = useCallback(
    (node) => {
      if (postLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.7) {
            setCtr((ctr) => ctr + 1);
          }
        },
        { threshold: [0, 0.5, 1] }
      );
      if (node) observer.current.observe(node);
    },
    [postLoading, hasMore]
  );

  // give a refresh button, reset feed state and reload the page
  return (
    <div className="m-2 flex flex-col items-center">
      {postList.map((post, index) => {
        if (postList.length === index + 1) {
          return (
            <PostSnippet key={post._id} ref={lastPostElement} post={post} />
          );
        }
        return <PostSnippet key={post._id} post={post} />;
      })}
      {postLoading && <div className="fixed bottom-4">Loading..</div>}
      {!showCreatePostModal && (
        <div
          onClick={() => setShowCreatePostModal(true)}
          className="fixed bottom-6 right-6 rounded-full h-10 w-20 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Tweet
        </div>
      )}
      {showCreatePostModal && (
        <CreatePost setShowCreatePostModal={setShowCreatePostModal} />
      )}
    </div>
  );
};
