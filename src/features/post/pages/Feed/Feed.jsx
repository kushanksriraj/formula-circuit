import { useSelector } from "react-redux";
import { getPostFeed } from "../../postSlice";
import { useState } from "react";
import { CreatePost } from "./CreatePost";
import { PostSnippet } from "./PostSnippet";
import { Button } from "../../../../common/Components";
import { PostLoading } from "./PostLoading";
import { useFeed } from "./useFeed";

export const Feed = () => {
  const { postList, hasMore, postLoading } = useSelector(getPostFeed);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const { lastPostElement } = useFeed();

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {postList.map((post, index) => {
        if (postList.length === index + 1) {
          return (
            <PostSnippet key={post._id} ref={lastPostElement} post={post} />
          );
        }
        return <PostSnippet key={post._id} post={post} />;
      })}
      {postLoading && <PostLoading />}
      {!hasMore && (
        <div className="font-semibold text-blue-400 mb-3">
          No more posts! Maybe write one?
        </div>
      )}
      {!showCreatePostModal && (
        <div className="fixed bottom-6 right-4">
          <Button text="Tweet" callback={() => setShowCreatePostModal(true)} />
        </div>
      )}
      {showCreatePostModal && (
        <CreatePost setShowCreatePostModal={setShowCreatePostModal} />
      )}
    </div>
  );
};
