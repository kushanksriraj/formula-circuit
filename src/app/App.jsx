import { Route, Routes } from "react-router";
import {
  Landing,
  PrivateRoute,
  UndefinedRoute,
  Navbar,
} from "../common/Components";
import { Login, SignUp, Profile } from "../features/user";
import { Feed, Post } from "../features/post";
import { Network } from "../features/network";
import { Notification } from "../features/notification";
import { useInitialize } from "../common/hooks";

function App() {
  const { initializeApp } = useInitialize();

  return (
    <div ref={initializeApp} className="App mt-16">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <PrivateRoute path="/feed" element={<Feed />} />
        <PrivateRoute path="/notification" element={<Notification />} />
        <PrivateRoute path="/post/:id" element={<Post />} />
        <PrivateRoute path="/profile" element={<Profile isCurrentUser />} />
        <PrivateRoute path="/user/:username/profile/" element={<Profile />} />
        <PrivateRoute path="/network" element={<Network isCurrentUser />} />
        <PrivateRoute path="/user/:username/network" element={<Network />} />
        <Route path="*" element={<UndefinedRoute />} />
      </Routes>
    </div>
  );
}

export default App;
