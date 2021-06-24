import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserId } from "../../../../user/userSlice";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);

  return (
    <div className="flex justify-between w-full px-4 border items-center mt-4 border-blue-400 rounded-md p-2">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          if (user._id === userId) {
            navigate("/profile");
          } else {
            navigate(`/user/${user.username}/profile`);
          }
        }}
      >
        <div className="">
          <img
            className="rounded-full w-10 h-10 overflow-hidden"
            src={user.profileURL}
            alt={user.name}
            loading="lazy"
          />
        </div>
        <div className="ml-4 flex-col">
          <div className="font-semibold">{user.name}</div>
          <div className="text-gray-400 -mt-1">@{user.username}</div>
        </div>
      </div>
    </div>
  );
};
