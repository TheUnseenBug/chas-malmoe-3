import useAuth from "./useAuth";

function getCodeFromUrl(url: string) {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams.get("code");
}
export default function getAccess() {
  const code = getCodeFromUrl(window.location.href);
  const accessToken = useAuth(code);
  return accessToken;
}
