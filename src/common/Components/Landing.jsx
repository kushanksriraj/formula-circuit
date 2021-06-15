import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import { getLoginStatus } from "../../features/user/userSlice";
import { Button } from "./Button/Button";

export const Landing = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(getLoginStatus);

  return (
    <div className="fixed z-40 top-0 w-screen h-screen bg-gradient-to-b from-white to-gray-200 flex flex-col items-center">
      {isUserLoggedIn && <Navigate to="/feed" replace />}
      <div className="material-icons-sharp text-5xl text-blue-400 mt-20">
        forum
      </div>
      <div className="font-semibold text-4xl text-blue-400 text-center">
        Formula Circuit
      </div>
      <div className="font-semibold text-gray-900 text-sm">
        A community of Formula 1 fans
      </div>
      <div className="mt-16 font-semibold text-lg mb-8">
        Login or Sign up to continue
      </div>
      <Button callback={() => navigate("/login")} text="LOG IN" />
      <div className="my-5 font-semibold">- OR -</div>
      <Button callback={() => navigate("/sign-up")} text="SIGN UP" />
    </div>
  );
};
