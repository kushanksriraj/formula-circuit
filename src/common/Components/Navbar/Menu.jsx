import { useNavigate } from "react-router";

export const Menu = ({ setShowMenu }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-50 bg-white shadow-lg rounded top-12 right-4 w-40 px-3 pt-6 md:right-48">
      <div
        onClick={() => setShowMenu(false)}
        className="material-icons-sharp absolute top-2 right-2 bg-blue-400 rounded-full text-white p-0.5 cursor-pointer"
      >
        clear
      </div>
      <div
        onClick={() => {
          setShowMenu(false);
          navigate("/profile");
        }}
        className="border p-2 mt-6 mb-4 bg-gray-100 rounded text-center font-semibold cursor-pointer"
      >
        Profile
      </div>
      <div
        onClick={() => {
          setShowMenu(false);
          navigate("/notification");
        }}
        className="border p-2 bg-gray-100 rounded text-center font-semibold mb-3 cursor-pointer"
      >
        Notification
      </div>
    </div>
  );
};
