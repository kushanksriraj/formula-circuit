import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export const useSearch = (searchText) => {
  const [resultList, setResultList] = useState({
    userList: [],
    postList: [],
  });

  const [loading, setLoading] = useState(true);

  const debouncer = useCallback(function (fn, delay) {
    let timerId;
    return function debounced(...args) {
      clearTimeout(timerId);
      const context = this;
      timerId = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }, []);

  const getSearchedData = useCallback(async (searchText) => {
    console.log(searchText);
    // setResultList(searchText); // this is the debounced function, do api call here
    if (searchText !== "") {
      setLoading(true);
      const res = await axios(`/search?text=${searchText}`);
      if (res.data?.success) {
        setResultList({
          userList: res.data.userList,
          postList: res.data.postList,
        });
        setLoading(false);
      }
    }
  }, []);

  const searchDebounced = useCallback(debouncer(getSearchedData, 500), []);

  useEffect(() => {
    searchDebounced(searchText);
  }, [searchText]);

  return {
    resultList,
    loading,
  };
};
