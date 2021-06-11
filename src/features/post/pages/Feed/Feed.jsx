import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getPostFeed, getFeedAsync } from "../../postSlice";

export const Feed = () => {
  const navigate = useNavigate();
  const post = useSelector(getPostFeed);

  return <div></div>;
};
