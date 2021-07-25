import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../../../../common/Components";
import { getError, signUpUserAsync } from "../../userSlice";

export const SignUpForm = () => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isError } = useSelector(getError);

  const signUpOnFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const name = e.currentTarget[0].value.trim();
    const username = e.currentTarget[1].value.trim();
    const email = e.currentTarget[2].value.trim();
    const password = e.currentTarget[3].value.trim();

    if (name === "" || email === "" || password === "" || username === "")
      return setError("All fields are required!");

    dispatch(signUpUserAsync({ name, username, email, password }));

    // !response && setError("Unable to sign up! Try again.");
  };

  useEffect(() => {
    if (isError) {
      setError("Sign up failed! Make sure your email & username are unique.");
    }
  }, [isError]);

  return (
    <form onSubmit={signUpOnFormSubmit}>
      <div className="my-4">
        <label htmlFor="name" className="font-semibold text-lg p-1">
          Name
        </label>
        <Input id="name" type="text" placeholder="Your name" />
      </div>
      <div className="my-4">
        <label htmlFor="username" className="font-semibold text-lg p-1">
          Username
        </label>
        <Input id="username" type="text" placeholder="Your username" />
      </div>
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
            callback={(e) => setPassword(e.target.value)}
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
      <div className="my-4">
        <label htmlFor="confirm-password" className="font-semibold text-lg p-1">
          Confirm password
        </label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm password"
          callback={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="text-red-500 text-sm font-semibold">
        {password !== confirmPassword && "Passwords must match!"}
      </div>
      <div className="text-red-500 text-sm font-semibold">{error}</div>
      <div className="flex justify-end my-6 mb-8">
        <Button
          text="SIGN UP"
          type="submit"
          disabled={password !== confirmPassword}
        />
      </div>
    </form>
  );
};
