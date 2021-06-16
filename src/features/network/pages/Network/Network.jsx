import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  followUserAsync,
  getLoadingStatus,
  getUserData,
  unFollowUserAsync,
} from "../../../user/userSlice";
import axios from "axios";
import { Button, LoadingModal } from "../../../../common/Components";

export const Network = ({ isCurrentUser }) => {
  const { username } = useParams();
  const currentUserData = useSelector(getUserData);
  const userLoading = useSelector(getLoadingStatus);
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
    <div className="flex flex-col items-center m-4 md:max-w-md md:m-auto md:mb-4">
      {(userLoading || loading) && <LoadingModal text="Loading..." />}
      <div className="font-semibold m-4 pt-8 text-xl">{data?.name}&apos;s</div>
      <div className="font-semibold text-lg m-4 text-left w-full">
        Followers
      </div>
      {data?.followersList?.map((user) => {
        return (
          <div
            key={user._id}
            className="flex justify-between w-full px-4 border items-center p-2 my-1"
          >
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
              <div className="ml-4">
                <div className="font-semibold">{user.name}</div>
              </div>
            </div>
            {user._id !== currentUserData._id && (
              <div>
                <Button
                  callback={() => {
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
                  text={
                    currentUserData?.followingList?.some(
                      (id) => id === user._id
                    )
                      ? "Unfollow"
                      : "Follow"
                  }
                />
              </div>
            )}
          </div>
        );
      })}
      <div className="font-semibold text-lg m-4 text-left w-full">
        Following
      </div>
      {data?.followingList
        ?.filter(
          (user) => !data?.followersList.some((obj) => obj._id === user._id)
        )
        .map((user) => {
          return (
            <div
              key={user._id}
              className="flex justify-between w-full px-4 border items-center p-2 my-1"
            >
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
                <div className="ml-4">
                  <div className="font-semibold">{user.name}</div>
                </div>
              </div>
              {user._id !== currentUserData._id && (
                <div>
                  <Button
                    callback={() => {
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
                    text={
                      currentUserData.followingList.some(
                        (id) => id === user._id
                      )
                        ? "Unfollow"
                        : "Follow"
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
