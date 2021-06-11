import React from "react";
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
import { useLoadData } from "../common/hooks";

function App() {
  useLoadData();
  return (
    <div className="App">
      <Navbar />
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
