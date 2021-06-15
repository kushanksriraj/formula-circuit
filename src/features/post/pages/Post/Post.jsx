import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserId } from "../../../user/userSlice";
import { EditPost } from "./EditPost";
import { getLoadingStatus } from "../../postSlice";
import { PostSnippet } from "../Feed/PostSnippet";
import { LoadingModal } from "../../../../common/Components";

export const Post = () => {
  const { id } = useParams();
  const userId = useSelector(getUserId);
  const postLoading = useSelector(getLoadingStatus);
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
    <div className="flex flex-col items-center pt-4">
      {loading && <LoadingModal text="Loading..." />}
      <div className="relative">
        {post && <PostSnippet post={post} heightFullContent={true} />}
        {post?.author._id === userId && (
          <div
            className="absolute top-6 right-2 material-icons-sharp text-4xl text-blue-400"
            onClick={() => setShowEditPostModal(true)}
          >
            edit_note
          </div>
        )}
      </div>
      {showEditPostModal && (
        <EditPost setShowEditPostModal={setShowEditPostModal} post={post} />
      )}
    </div>
  );
};
