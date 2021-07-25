export const InputBox = ({ searchText, setSearchText }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <input
        value={searchText !== "DEFAULT" ? searchText : ""}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        className="p-2 w-3/4 max-w-xs flex-1 appearance-none border border-transparent bg-white text-gray-700 placeholder-gray-400 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-blue-400
       focus:border-transparent text-lg"
        placeholder="Search for posts and @username"
      />
    </div>
  );
};
