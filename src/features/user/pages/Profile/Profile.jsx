import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  followUserAsync,
  getUserData,
  logOutUserAsync,
  unFollowUserAsync,
} from "../../userSlice";
import { EditProfile } from "./EditProfile";

export const Profile = ({ isCurrentUser }) => {
  const { username } = useParams();
  const currentUserData = useSelector(getUserData);
  const [data, setData] = useState({});
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const mountRef = useRef({ isMounted: false });
  const currentUser = isCurrentUser || data?._id === currentUserData._id;
  const navigate = useNavigate();

  useEffect(() => {
    mountRef.current.isMounted = true;
    (async () => {
      if (!currentUser) {
        try {
          mountRef.current.isMounted && setLoading(true);
          const res = await axios.get(`/user/${username}`);
          if (res.data?.success) {
            mountRef.current.isMounted && setData(res.data.user);
          }
        } catch (error) {
          console.error(error);
        } finally {
          mountRef.current.isMounted && setLoading(false);
        }
      } else {
        mountRef.current.isMounted && setData(currentUserData);
      }
    })();
    return () => (mountRef.current.isMounted = false); // eslint-disable-line react-hooks/exhaustive-deps
  }, [currentUser, currentUserData, username]);

  return (
    <div>
      <h2 className="font-bold mb-5">Profile</h2>
      {loading && <h3>Loading...</h3>}
      <div className="flex justify-around">
        <div className="">
          <img
            className="rounded-full w-14 h-14 overflow-hidden"
            src={data.profileURL}
            alt={data.name}
            loading="lazy"
          />
        </div>
        <div className="ml-4 flex-col">
          <div className="font-semibold">Name: {data.name}</div>
          <div className="text-gray-400 -mt-1">Username: {data.username}</div>
        </div>
      </div>
      <div className="border m-4 p-4">
        <h3 className="font-bold">Bio</h3>
        <div>{data.bio}</div>
      </div>
      {!currentUser && (
        <button
          onClick={() => {
            if (data.followersList.includes(currentUserData._id)) {
              dispatch(unFollowUserAsync({ userId: data._id }));
            } else {
              dispatch(followUserAsync({ userId: data._id }));
            }
          }}
          className="rounded-full h-10 w-32 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          {data?.followersList?.includes(currentUserData._id)
            ? "Unfollow"
            : "Follow"}
        </button>
      )}
      <div
        className="w-40 border-2 flex cursor-pointer"
        onClick={() => {
          if (currentUser) {
            navigate("/network");
          } else {
            navigate(`/user/${data.username}/network`);
          }
        }}
      >
        <div>Followers: {data?.followersList?.length}</div>
        <div>Following: {data?.followingList?.length}</div>
      </div>
      {currentUser && (
        <button
          onClick={() => dispatch(logOutUserAsync())}
          className="rounded-full h-10 w-32 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Log out
        </button>
      )}
      {!showEditProfileModal && currentUser && (
        <div
          onClick={() => setShowEditProfileModal(true)}
          className="fixed bottom-6 right-6 rounded-full h-10 w-32 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Edit profile
        </div>
      )}
      {showEditProfileModal && (
        <EditProfile setShowEditProfileModal={setShowEditProfileModal} />
      )}
      {/* Show number of followers and followings and link it to network page: See more */}
    </div>
  );
};
