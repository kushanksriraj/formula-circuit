export const PostLoading = () => {
  return (
    <div className="m-auto flex flex-col items-center justify-center my-4">
      <div className="material-icons-sharp spin__modal text-blue-500 text-5xl">sync</div>
      <div className="font-semibold text-blue-500">Fetching posts...</div>
    </div>
  );
};
