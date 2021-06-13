import { useSelector, useDispatch } from "react-redux";
import { getUserData, updateUserDataAsync } from "../../../user/userSlice";
import { useEffect, useRef, useState } from "react";

export const EditProfile = ({ setShowEditProfileModal }) => {
  const data = useSelector(getUserData);
  const [profileURL, setProfileURL] = useState(data.profileURL);
  const [bio, setBio] = useState(data.bio);
  const dispatch = useDispatch();
  const mountRef = useRef({ isMounted: false });

  useEffect(() => {
    mountRef.current.isMounted = true;
    return () => (mountRef.current.isMounted = false); // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "formula-web-apps",
          uploadPreset: "ml_default",
          cropping: true,
        },
        (error, result) => {
          if (result.info?.secure_url) {
            setProfileURL(result.info.secure_url);
          }
        }
      )
      .open();
  };

  const updateProfileOnClick = () => {
    dispatch(updateUserDataAsync({ bio, profileURL })).then(
      () => mountRef.current.isMounted && setShowEditProfileModal(false)
    );
  };

  return (
    <div className="fixed h-screen top-8 w-screen bg-gray-300 bg-opacity-95 flex justify-center">
      <div className="relative w-full p-4 pt-8 mt-8">
        <div
          className="absolute right-4 top-2"
          onClick={() => setShowEditProfileModal(false)}
        >
          X
        </div>
        <div className="flex justify-evenly items-center">
          <img
            className="rounded-full w-14 h-14 overflow-hidden"
            src={profileURL}
            alt={data.name}
            loading="lazy"
          />
          <button onClick={openWidget}>Upload Profile Picture</button>
        </div>

        <div className="mt-4">
          <div className="font-bold">Edit bio</div>
          <textarea
            value={bio}
            className="p-2 w-full h-48"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <div
          onClick={updateProfileOnClick}
          className="rounded-full h-10 w-20 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Save
        </div>
        <div
          onClick={() => setShowEditProfileModal(false)}
          className="rounded-full h-10 w-20 text-s flex justify-center items-center bg-blue-500 font-bold text-white shadow-lg"
        >
          Discard
        </div>
      </div>
    </div>
  );
};
