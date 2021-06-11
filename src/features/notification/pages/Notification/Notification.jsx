import { useNavigate } from "react-router";

export const Notification = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl">
        This is Notification page
        <button onClick={() => navigate(-1)}>Go back</button>
      </h2>
    </div>
  );
};
