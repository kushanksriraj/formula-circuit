import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Landing, PrivateRoute, UndefinedRoute } from "./helpers/Components";
import "./App.css";

export const Login = () => {
  return (
    <div>
      This is Login page
      <h2 className="text-2xl">Welcome</h2>
    </div>
  );
};

export const SignUp = () => {
  return (
    <div>
      This is Sign up page
      <h2 className="text-2xl">Welcome</h2>
    </div>
  );
};

export const Feed = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl">
        This is Feed page
        <button onClick={() => navigate(-1)}>Go back</button>
      </h2>
    </div>
  );
};

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

export const Post = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl">
        This is Post page
        <button onClick={() => navigate(-1)}>Go back</button>
      </h2>
    </div>
  );
};

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

function App() {
  return (
    <div className="App">
      {/* Nav */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <PrivateRoute path="/feed" element={<Feed />} />
        <PrivateRoute path="/notification" element={<Notification />} />
        <PrivateRoute path="/post/:id" element={<Post />} />
        <PrivateRoute path="/profile" element={<Profile currentUser />} />
        <PrivateRoute path="/user/:id/profile/" element={<Profile />} />
        <PrivateRoute path="/network" element={<Network currentUser />} />
        <PrivateRoute path="/user/:id/network" element={<Network />} />
        <Route path="*" element={<UndefinedRoute />} />
      </Routes>
    </div>
  );
}

export default App;
