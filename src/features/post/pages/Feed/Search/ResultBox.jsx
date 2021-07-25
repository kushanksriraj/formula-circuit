import { UserCard } from "./UserCard";
import { PostCard } from "./PostCard";

export const ResultBox = ({ resultList, loading, searchText }) => {
  return (
    <div className="mt-4 p-4 w-3/4 max-w-xs flex-1 appearance-none border border-transparent bg-white text-gray-700  shadow-md rounded overflow-y-auto">
      {resultList.postList.length === 0 &&
        resultList.userList.length === 0 &&
        !loading && (
          <div className="text-lg">
            Try searching with different keywords...
          </div>
        )}
      {loading && (
        <div className="text-lg text-center font-semibold">Loading...</div>
      )}
      {searchText === "DEFAULT" && !loading && (
        <div className="text-lg text-center">Recently joined users</div>
      )}
      <ul>
        {resultList.userList.map((user) => {
          return <UserCard key={user._id} user={user} />;
        })}
      </ul>
      <ul>
        {resultList.postList.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })}
      </ul>
    </div>
  );
};
