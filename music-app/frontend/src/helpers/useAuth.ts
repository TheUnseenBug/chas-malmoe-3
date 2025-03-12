import { useState, useEffect } from "react";
import axios from "axios";
import useAccessStore from "@/store/store";

export default function useAuth(code: string) {
  const token = useAccessStore().accessToken;
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  //FIXME refreshToken funkar inte
  console.log("useAth runs, code:", code);
  console.log("token:", token);
  if (!token) {
    if (code) {
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
    }
  }

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
