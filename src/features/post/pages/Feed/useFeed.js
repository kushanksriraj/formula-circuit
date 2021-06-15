import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedAsync, getPostFeed } from "../../postSlice";

export const useFeed = () => {
  const [ctr, setCtr] = useState(0);
  const dispatch = useDispatch();
  const observer = useRef();
  const { hasMore, postLoading } = useSelector(getPostFeed);

  useEffect(() => {
    dispatch(getFeedAsync());
  }, [ctr]); // eslint-disable-line react-hooks/exhaustive-deps

  const lastPostElement = useCallback(
    (node) => {
      if (postLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.7) {
            setCtr((ctr) => ctr + 1);
          }
        },
        { threshold: [0, 0.5, 1] }
      );
      if (node) observer.current.observe(node);
    },
    [postLoading, hasMore]
  );
  return { lastPostElement };
};
