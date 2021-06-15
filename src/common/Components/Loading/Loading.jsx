import "./loading.css";
export const Loading = () => {
  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700 opacity-60 -mt-16">
      <div className="material-icons-sharp spin text-white">sync</div>
    </div>
  );
};
