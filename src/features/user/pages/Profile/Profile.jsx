import { useNavigate } from "react-router";

export const Profile = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl">
        {currentUser
          ? "This is your profile page"
          : "This is other user's profile page"}
        <button onClick={() => navigate(-1)}>Go back</button>
      </h2>
    </div>
  );
};
