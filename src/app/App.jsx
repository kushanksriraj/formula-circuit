import React, { useCallback } from "react";
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
import { useAxios } from "../common/hooks";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../common/api.config";
import { getUserDataAsync } from "../features/user/userSlice";

function App() {
  const { setAxiosAuthHeader, setAxiosBaseURL, setAxiosIntercept } = useAxios();
  const dispatch = useDispatch();

  const appNode = useCallback(() => {
    (async () => {
      try {
        setAxiosBaseURL(BASE_URL);
        setAxiosIntercept();
        const localLoginData = localStorage.getItem("login");
        if (localLoginData) {
          const loginData = JSON.parse(localLoginData);
          setAxiosAuthHeader(loginData.token);
        }
        dispatch(getUserDataAsync());
      } catch (err) {
        console.error(err);
      } finally {
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={appNode} className="App">
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
