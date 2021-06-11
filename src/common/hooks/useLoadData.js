import { useEffect } from "react";
import { BASE_URL } from "../api.config";
import { useAxios } from "./useAxios";

export const useLoadData = () => {
  const { setAxiosBaseURL, setAxiosAuthHeader, setAxiosIntercept } = useAxios();

  useEffect(() => {
    (async () => {
      try {
        setAxiosBaseURL(BASE_URL);
        setAxiosIntercept();
        const localLoginData = localStorage.getItem("login");
        if (localLoginData) {
          const loginData = JSON.parse(localLoginData);
          setAxiosAuthHeader(loginData.token);
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    })();
  }, []);
};
