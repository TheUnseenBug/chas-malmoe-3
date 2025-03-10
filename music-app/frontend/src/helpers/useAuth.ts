import { useState, useEffect } from "react";
import axios from "axios";
import getCodeFromUrl from "./getUrl";
import useAccessStore from "@/store/store";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  console.log("useAth runs");
  const code = getCodeFromUrl(window.location.href);
  useEffect(() => {
    if (accessToken) return;
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then(
        (res: {
          data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
          };
        }) => {
          addAccessToken(res.data.accessToken);
          console.log(res.data);
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
        }
      );
  }, [code, accessToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
