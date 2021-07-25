import { Link } from "react-router-dom";

export const UndefinedRoute = () => {
  return (
    <div className="flex flex-col items-center justify-center border h-screen -mt-16">
      <div className="font-bold text-3xl text-gray-500">Page not found!</div>
      <div className="m-4">
        <Link
          to="/"
          replace
          className="text-blue-400 font-semibold underline text-lg"
        >
          Go to home page
        </Link>
      </div>
    </div>
  );
};
