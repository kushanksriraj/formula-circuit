import { useState } from "react";
import { InputBox } from "./InputBox";
import { ResultBox } from "./ResultBox";
import { useSearch } from "./useSearch";

export const Search = () => {
  const [searchText, setSearchText] = useState("DEFAULT");
  const { resultList, loading } = useSearch(searchText);

  return (
    <div
      className="hidden sticky md:flex md:flex-col items-center top-28 p-4 m-4"
      style={{ height: "60vh" }}
    >
      <InputBox searchText={searchText} setSearchText={setSearchText} />
      <ResultBox
        resultList={resultList}
        loading={loading}
        searchText={searchText}
      />
    </div>
  );
};
