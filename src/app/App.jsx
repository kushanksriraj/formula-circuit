import React, { useCallback, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  const appNode = useCallback(() => {
    (async () => {
      try {
        setLoading(true);
        setAxiosBaseURL(BASE_URL);
        setAxiosIntercept();
        const localLoginData = localStorage.getItem("login");
        if (localLoginData) {
          const loginData = JSON.parse(localLoginData);
          setAxiosAuthHeader(loginData.token);
        }
        dispatch(getUserDataAsync()).then(() => setLoading(false));
      } catch (err) {
        setLoading(false);
        console.error(err);
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
        <PrivateRoute path="/feed" element={<Feed />} loading={loading} />
        <PrivateRoute
          path="/notification"
          element={<Notification />}
          loading={loading}
        />
        <PrivateRoute path="/post/:id" element={<Post />} loading={loading} />
        <PrivateRoute
          path="/profile"
          element={<Profile isCurrentUser />}
          loading={loading}
        />
        <PrivateRoute
          path="/user/:username/profile/"
          element={<Profile />}
          loading={loading}
        />
        <PrivateRoute
          path="/network"
          element={<Network isCurrentUser />}
          loading={loading}
        />
        <PrivateRoute
          path="/user/:username/network"
          element={<Network />}
          loading={loading}
        />
        <Route path="*" element={<UndefinedRoute />} />
      </Routes>
    </div>
  );
}

export default App;
