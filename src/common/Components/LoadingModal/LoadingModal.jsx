import "./loading-modal.css";
export const LoadingModal = ({ text }) => {
  return (
    <div className="z-10 fixed w-screen h-screen bg-gray-50 bg-opacity-90 flex justify-center items-center -mt-16">
      <div className="w-36 h-30 shadow-md bg-blue-400 flex flex-col items-center justify-center p-4">
        <div className="material-icons-sharp spin__modal text-white text-5xl">
          sync
        </div>
        <div className="font-semibold text-white">{text}</div>
      </div>
    </div>
  );
};
