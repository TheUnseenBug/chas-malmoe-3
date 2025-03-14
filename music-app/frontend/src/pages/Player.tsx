// import { Slider } from "@radix-ui/react-slider";
// import Image from "@/assets/billie.jpg";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "@/components/ui/PlayerButtons";
import { Slider } from "@radix-ui/react-slider";
import SpotifyPlayer from "react-spotify-web-playback";

// export default function Player() {
//   const code = new URLSearchParams(window.location.search).get("code");
//   console.log("code:", code);
//   const token = useAccessStore().accessToken;
//   if (code) {
//     useAuth(code);
//   }

//   console.log("accesstoken:", token);
//   return <PlayerComponent accessToken={token} />;
export default function Player(accessToken: any, trackUri: any) {
  if (!accessToken) return null;
  return (
    <div className="flex flex-col align-center gap-5">
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
      />
      <div className="flex items-stretch gap-3 self-center bg-colors-customYellow border-4 border-black rounded-md p-4 w-3/4">
        <img
          src={Image}
          alt="Album Cover"
          className="rounded-md border-4 border-black w-1/3 self-center object-cover"
        />
        <div className="rounded-md border-4 border-black w-2/3 p-4 bg-colors-customPink text-left">
          <h2 className="text-3xl text-strong">
            I'm a Fool to Want You (with Ray Ellis & His Orchestra)
          </h2>
          <h3 className="text-2xl">
            Billie Holiday, Ray Ellis And His Orchestra
          </h3>
          <p>Album Name</p>ß
          <Slider />
          <div className="flex gap-3 justify-center">
            <PreviousButton />
            <PlayButton />
            <PauseButton />
            <NextButton />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="p-6 rounded-md border-4 border-black bg-colors-customYellow m-5 flex flex-row place-content-between max-w-1/2">
        <div>
          <img src={Image} alt="Billie Holiday" className="size-" />
        </div>
        <div className="border-black border-4 rounded-md bg-colors-customPink m-5 p-6 text-left max-w-1/2">
          <h2>Favourite Song</h2>
          <h3>Billie Holiday</h3>
          <p>Album Name</p>
          <button>Previous</button>
          <button>Play/Pause</button>
          <button>Next</button>
          <Slider defaultValue={[33]} max={100} step={1} />
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </div> */
}
