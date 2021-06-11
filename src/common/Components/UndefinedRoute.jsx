import { useNavigate } from "react-router";

export const UndefinedRoute = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl">
        Undefined route!
        <button onClick={() => navigate("/")}>Go to home page</button>
      </h2>
    </div>
  );
};
