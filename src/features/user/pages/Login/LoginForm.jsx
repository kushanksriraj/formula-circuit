import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../common/Components/Button/Button";
import { Input } from "../../../../common/Components/Input/Input";
import { getError, logUserAsync } from "../../userSlice";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isError } = useSelector(getError);

  const loginOnFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.currentTarget[0].value.trim();
    const password = e.currentTarget[1].value.trim();
    if (email === "" || password === "")
      return setError("Both fields are required! Try again.");
    dispatch(logUserAsync({ email, password }));
  };

  useEffect(() => {
    if (isError) {
      setError("Login failed! Please enter valid credentials.");
    }
  }, [isError]);

  return (
    <form onSubmit={loginOnFormSubmit}>
      <div className="my-4">
        <label htmlFor="email" className="font-semibold text-lg p-1">
          Email
        </label>
        <Input id="email" type="email" placeholder="Your email" />
      </div>
      <div className="my-4">
        <label htmlFor="password" className="font-semibold text-lg p-1">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "password" : "text"}
            placeholder="Your password"
          />
          <div
            className="material-icons-sharp absolute top-3 right-2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "visibility" : "visibility_off"}
          </div>
        </div>
      </div>
      <div className="text-red-500 text-sm font-semibold">{error}</div>
      <div className="flex justify-end my-6 mb-8">
        <Button text="LOG IN" type="submit" />
      </div>
    </form>
  );
};
