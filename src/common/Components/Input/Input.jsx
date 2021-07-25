export const Input = ({ id, type, placeholder, callback }) => {
  return (
    <input
      className="flex-1 appearance-none border border-transparent w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={callback}
    />
  );
};
