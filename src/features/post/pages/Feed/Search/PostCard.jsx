import { useNavigate } from "react-router";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full px-4 border items-center mt-4 border-blue-400 rounded-md p-2">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate(`/post/${post._id}`)}
      >
        <div className="flex items-center w-full mb-2">
          <div>
            <img
              className="rounded-full w-10 h-10 overflow-hidden"
              src={post.author.profileURL}
              alt={post.author.name}
              loading="lazy"
            />
          </div>
          <div className="font-semibold ml-2">{post.author.name}</div>
        </div>

        <div className="ml-4">
          <div className="module line-clamp cursor-pointer">{post.content}</div>
        </div>
      </div>
    </div>
  );
};
