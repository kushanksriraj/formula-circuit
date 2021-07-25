import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { LoadingModal } from "../../../../common/Components";
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

  useEffect(() => {
    dispatch(getAllNotificationsAsync());
    const socket = io("wss://formula-circuit-backend.kushanksriraj.repl.co");
    socket.on("connect", function () {
      console.log("Connected via websocket");
    });
    socket.on("changeData", function (data) {
      console.log("Recieved: ", { data, id });
      if (data.userId === id) {
        dispatch(addNewNotification({ data }));
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = ({ doc }) => {
    switch (doc.action) {
      case "LIKED":
        return navigate(`/post/${doc.postId}`);

      case "FOLLOWED":
        return navigate(`/user/${doc.actionCreatorId.username}/profile`);

      case "REACTED":
        return navigate(`/post/${doc.postId}`);

      default:
        break;
    }
  };

  return (
    <div className="md:max-w-md md:m-auto pt-8">
      {notificationLoading && <LoadingModal text="Loading..." />}
      <div className="font-semibold m-4">Notifications</div>
      <div className="flex flex-col items-center mb-4">
        {notificationList.map((doc) => {
          return (
            <div
              key={doc._id}
              className="border p-3 w-72 truncate m-2 border-blue-400 bg-blue-100 cursor-pointer"
              onClick={() => handleClick({ doc })}
            >
              <div>
                {doc.action === "LIKED" &&
                  `👍 ${doc.actionCreatorId?.name} liked your post!`}
              </div>
              <div>
                {doc.action === "REACTED" &&
                  `👏 ${doc.actionCreatorId?.name} reacted to your post!`}
              </div>
              <div>
                {doc.action === "FOLLOWED" &&
                  `🏃‍♂️ ${doc.actionCreatorId?.name} started following you!`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
