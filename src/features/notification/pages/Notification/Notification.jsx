import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { getUserId } from "../../../user/userSlice";
import {
  getAllNotificationsAsync,
  getAllNotifications,
  getLoadingStatus,
  addNewNotification,
} from "../../notificationSlice";

export const Notification = () => {
  const navigate = useNavigate();
  const id = useSelector(getUserId);
  const notificationList = useSelector(getAllNotifications);
  const notificationLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();
  console.log({ notificationList });

  useEffect(() => {
    dispatch(getAllNotificationsAsync());
    const socket = io("wss://formula-circuit-backend.kushanksriraj.repl.co");
    socket.on("connect", function () {
      console.log("connected");
    });
    socket.on("changeData", function (data) {
      console.log({ data, id });
      if (data.userId === id) {
        dispatch(addNewNotification({ data }));
      }
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl">
        This is Notification page
        <button onClick={() => navigate(-1)}>Go back</button>
      </h2>
      {notificationLoading && <h1>Loading...</h1>}
      {notificationList.map((doc) => {
        return (
          <div key={doc._id}>
            <div>
              {doc.action === "LIKED" &&
                `${doc.actionCreatorId.name} liked your post!`}
            </div>
            <div>
              {doc.action === "REACTED" &&
                `${doc.actionCreatorId.name} reacted to your post!`}
            </div>
            <div>
              {doc.action === "FOLLOWED" &&
                `${doc.actionCreatorId.name} started following you!`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Notification actions
 * - Chris liked your post:
 *     Who liked,
 *     link: your post
 *     link: localhost:3000/post/4terfdfds
 * - Chris reacted to your post
 *     who reacted,
 *     link: your post
 *     link: localhost:3000/post/4terfdfds
 * - Chris followed you
 *     who followed,
 *     link: your profile
 *     link: localhost:3000/user/chris/profile
 */
