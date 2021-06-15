import { useNavigate } from "react-router";

export const Menu = ({ setShowMenu }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-50 bg-white shadow-lg rounded top-12 right-4 py-4 px-8">
      <div
        onClick={() => setShowMenu(false)}
        className="material-icons-sharp absolute top-2 right-2"
      >
        clear
      </div>
      <div
        onClick={() => {
          setShowMenu(false);
          navigate("/profile");
        }}
        className="border px-2 mt-4 mb-4 bg-gray-100 rounded text-center font-semibold"
      >
        Profile
      </div>
      <div
        onClick={() => {
          setShowMenu(false);
          navigate("/notification");
        }}
        className="border px-2 bg-gray-100 rounded text-center font-semibold"
      >
        Notification
      </div>
    </div>
  );
};
