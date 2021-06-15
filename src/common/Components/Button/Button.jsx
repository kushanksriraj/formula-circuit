export const Button = ({ callback, text, type, disabled }) => {
  return (
    <button
      type={type}
      onClick={callback}
      disabled={disabled}
      className="rounded h-10 w-20 flex justify-center items-center bg-blue-400 font-bold text-white shadow-lg disabled:opacity-80"
    >
      {text}
    </button>
  );
};
