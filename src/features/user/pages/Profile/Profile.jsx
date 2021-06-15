import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, LoadingModal } from "../../../../common/Components";
import { resetState } from "../../../post/postSlice";
import {
  followUserAsync,
  getLoadingStatus,
  getUserData,
  logOutUserAsync,
  unFollowUserAsync,
} from "../../userSlice";
import { EditProfile } from "./EditProfile";

export const Profile = ({ isCurrentUser }) => {
  const { username } = useParams();
  const currentUserData = useSelector(getUserData);
  const userLoading = useSelector(getLoadingStatus);
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
    <div className="pt-4 px-2 flex flex-col justify-center">
      {(loading || userLoading) && <LoadingModal text="Loading..." />}
      <div className="flex items-center ml-8 mt-2">
        <div className="">
          <img
            className="rounded-full w-14 h-14 overflow-hidden"
            src={data.profileURL}
            alt={data.name}
            loading="lazy"
          />
        </div>
        <div className="ml-4 flex-col">
          <div className="font-semibold">{data.name}</div>
          <div className="text-gray-400 -mt-1">@{data.username}</div>
        </div>
      </div>
      <div className="flex justify-evenly cursor-pointer mt-4">
        <div className="flex flex-col items-center justify-center">
          <div className="font-semibold">{data?.followersList?.length}</div>
          <div className="text-gray-600 -mt-1">Followers</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-semibold">{data?.followingList?.length}</div>
          <div className="text-gray-600 -mt-1">Following</div>
        </div>
        <div
          className="text-blue-400 font-semibold flex items-end"
          onClick={() => {
            if (currentUser) {
              navigate("/network");
            } else {
              navigate(`/user/${data.username}/network`);
            }
          }}
        >
          See all
          <span className="material-icons-sharp text-base">call_made</span>
        </div>
      </div>
      <div>
        <h3 className="font-bold mt-4 ml-6">Bio</h3>
        <div className="border m-4 p-4 rounded">{data.bio}</div>
      </div>

      {!currentUser && (
        <div className="flex justify-end m-4">
          <Button
            callback={() => {
              if (data.followersList.includes(currentUserData._id)) {
                dispatch(unFollowUserAsync({ userId: data._id }));
              } else {
                dispatch(followUserAsync({ userId: data._id }));
              }
            }}
            text={
              data?.followersList?.includes(currentUserData._id)
                ? "Unfollow"
                : "Follow"
            }
          />
        </div>
      )}

      {!showEditProfileModal && currentUser && (
        <div className="flex justify-end m-4">
          <Button callback={() => setShowEditProfileModal(true)} text="Edit" />
        </div>
      )}
      {currentUser && (
        <div className="fixed bottom-6 right-6">
          <Button
            callback={() => {
              dispatch(resetState());
              dispatch(logOutUserAsync());
            }}
            text="Log out"
          />
        </div>
      )}
      {showEditProfileModal && (
        <EditProfile setShowEditProfileModal={setShowEditProfileModal} />
      )}
    </div>
  );
};
