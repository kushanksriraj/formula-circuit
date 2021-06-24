import { Link } from "react-router-dom";

export const NavList = () => {
  return (
    <div className="hidden sticky md:block top-32 p-4 h-60">
      <div className="absolute right-48 flex flex-col ml-4">
        <Link to="/feed" className="pt-4 text-blue-400 font-semibold text-lg">
         HOME
        </Link>
        <Link
          to="/notification"
          className="pt-6 text-blue-400 font-semibold text-lg"
        >
          NOTIFICATION
        </Link>
        <Link
          to="/profile"
          className="pt-6 text-blue-400 font-semibold text-lg"
        >
          PROFILE
        </Link>
        <Link
          to="/posts/all"
          className="pt-6 text-blue-400 font-semibold text-lg"
        >
          YOUR POSTS
        </Link>
      </div>
    </div>
  );
};
