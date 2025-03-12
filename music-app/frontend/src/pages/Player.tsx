import PlayerComponent from "@/components/PlayerComponent";
import useAccessStore from "@/store/store";
import useAuth from "@/helpers/useAuth";

export default function Player() {
  const code = new URLSearchParams(window.location.search).get("code");
  console.log("code:", code);
  const token = useAccessStore().accessToken;
  if (code) {
    useAuth(code);
  }

  console.log("accesstoken:", token);
  return <PlayerComponent accessToken={token} />;
}
