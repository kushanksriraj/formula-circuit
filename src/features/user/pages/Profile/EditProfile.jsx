import { useSelector, useDispatch } from "react-redux";
import { getUserData, updateUserDataAsync } from "../../../user/userSlice";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../common/Components";

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
    <div className="fixed top-8 -ml-2 h-screen w-screen bg-gray-300 bg-opacity-95 flex justify-center">
      <div className="relative w-full h-3/4 p-4 pt-8 mt-8">
        <div
          onClick={() => setShowEditProfileModal(false)}
          className="material-icons-sharp absolute top-4 right-4 text-3xl bg-white rounded-full h-10 w-10 flex items-center justify-center p-2 text-blue-400"
        >
          clear
        </div>
        <div className="flex items-center">
          <img
            className="rounded-full w-14 h-14 overflow-hidden"
            src={profileURL}
            alt={data.name}
            loading="lazy"
          />
          <button
            onClick={openWidget}
            className="rounded h-10 flex justify-center items-center bg-blue-400 font-bold text-white shadow-lg px-2 ml-4"
          >
            Upload Profile Picture
          </button>
        </div>

        <div className="mt-4 relative">
          <div className="p-2 text-lg">Edit bio</div>
          <textarea
            value={bio}
            className="p-3 w-full h-48 flex-1 appearance-none border border-transparent bg-white text-gray-700 placeholder-gray-400 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end pt-2 mt-3">
          <div className="flex justify-between w-44">
            <Button callback={updateProfileOnClick} text="Save" />
            <Button
              callback={() => setShowEditProfileModal(false)}
              text="Discard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
