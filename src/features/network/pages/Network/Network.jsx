import { useNavigate } from "react-router";

export const Network = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl">
        {currentUser
          ? "This is your Network page"
          : "This is other user's Network page"}
        <button onClick={() => navigate(-1)}>Go back</button>
      </h2>
    </div>
  );
};
