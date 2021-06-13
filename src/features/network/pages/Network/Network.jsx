import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  followUserAsync,
  getUserData,
  unFollowUserAsync,
} from "../../../user/userSlice";
import axios from "axios";

export const Network = ({ isCurrentUser }) => {
  const { username } = useParams();
  const currentUserData = useSelector(getUserData);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const mountRef = useRef({ isMounted: false });
  const currentUser = isCurrentUser || data?._id === currentUserData._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    mountRef.current.isMounted = true;
    (async () => {
      if (!currentUser) {
        try {
          mountRef.current.isMounted && setLoading(true);
          const res = await axios.get(`/user/network/${username}`);
          if (res.data?.success) {
            mountRef.current.isMounted && setData(res.data.user);
          }
        } catch (error) {
          console.error(error);
        } finally {
          mountRef.current.isMounted && setLoading(false);
        }
      } else {
        try {
          mountRef.current.isMounted && setLoading(true);
          const res = await axios.get(
            `/user/network/${currentUserData.username}`
          );
          if (res.data?.success) {
            mountRef.current.isMounted && setData(res.data.user);
          }
        } catch (error) {
          console.error(error);
        } finally {
          mountRef.current.isMounted && setLoading(false);
        }
      }
    })();
    return () => (mountRef.current.isMounted = false); // eslint-disable-line react-hooks/exhaustive-deps
  }, [currentUser, currentUserData, username]);

  return (
    <div>
      <h2 className="font-bold">{data?.name}</h2>
      <header className="font-bold">Followers</header>
      {data?.followersList?.map((user) => {
        return (
          <div key={user._id} className="flex items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                if (user._id === currentUserData._id) {
                  navigate("/profile");
                } else {
                  navigate(`/user/${user.username}/profile`);
                }
              }}
            >
              <div className="">
                <img
                  className="rounded-full w-14 h-14 overflow-hidden"
                  src={user.profileURL}
                  alt={user.name}
                  loading="lazy"
                />
              </div>
              <div className="ml-4 flex-col">
                <div className="font-semibold">{user.name}</div>
              </div>
            </div>
            {user._id !== currentUserData._id && (
              <button
                onClick={() => {
                  if (
                    currentUserData?.followingList?.some(
                      (id) => id === user._id
                    )
                  ) {
                    dispatch(unFollowUserAsync({ userId: user._id }));
                  } else {
                    dispatch(followUserAsync({ userId: user._id }));
                  }
                }}
                className="rounded-full h-10 w-32 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
              >
                {currentUserData?.followingList?.some((id) => id === user._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            )}
          </div>
        );
      })}
      <header className="font-bold">Following</header>
      {data?.followingList
        ?.filter(
          (user) => !data?.followersList.some((obj) => obj._id === user._id)
        )
        .map((user) => {
          return (
            <div key={user._id} className="flex items-center">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  if (user._id === currentUserData._id) {
                    navigate("/profile");
                  } else {
                    navigate(`/user/${user.username}/profile`);
                  }
                }}
              >
                <div className="">
                  <img
                    className="rounded-full w-14 h-14 overflow-hidden"
                    src={user.profileURL}
                    alt={user.name}
                    loading="lazy"
                  />
                </div>
                <div className="ml-4 flex-col">
                  <div className="font-semibold">{user.name}</div>
                </div>
              </div>
              {user._id !== currentUserData._id && (
                <button
                  onClick={() => {
                    if (
                      currentUserData.followingList.some(
                        (id) => id === user._id
                      )
                    ) {
                      dispatch(unFollowUserAsync({ userId: user._id }));
                    } else {
                      dispatch(followUserAsync({ userId: user._id }));
                    }
                  }}
                  className="rounded-full h-10 w-32 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
                >
                  {currentUserData.followingList.some((id) => id === user._id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};
