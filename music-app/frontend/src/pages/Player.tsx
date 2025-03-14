import { Slider } from "@radix-ui/react-slider";
import Image from "@/assets/billie.jpg";
import SpotifyPlayer from "react-spotify-web-playback";
import {
  PlayButton,
  PauseButton,
  PreviousButton,
  NextButton,
} from "@/components/ui/PlayerButtons";

export default function Player(accessToken: any, trackUri: any) {
  if (!accessToken) return null;
  return (
    <div className="flex flex-col align-center gap-5">
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
      />

      <div className="gap-3 self-center bg-colors-customYellow border-4 border-black rounded-md p-4 flex flex-col lg:flex-col w-3/4">
        {/* Album + Info */}
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          {/* Album cover */}
          <div className="self-center w-full lg:w-1/2">
            <img
              src={Image}
              alt="Album Cover"
              className="rounded-md border-4 border-black w-full"
            />
          </div>

          {/* Info container */}
          <div className="rounded-md border-4 border-black p-4 bg-colors-customPink text-left w-full lg:w-1/2 self-stretch">
            <h2 className="font-bold sm:text-lg md:text-2xl lg:text-4xl">
              I'm a Fool to Want You (with Ray Ellis & His Orchestra)
            </h2>
            <h3 className="sm:text-lg md:text-2xl lg:text-4xl">
              Billie Holiday, Ray Ellis And His Orchestra
            </h3>
            <p className="italic sm:text-lg md:text-2xl lg:text-3xl">
              Album Name
            </p>
          </div>
        </div>

        {/* Button controls */}
        <div className="flex flex-row gap-3 justify-center w-full order-3 mt-4">
          <PreviousButton />
          <PlayButton />
          <PauseButton />
          <NextButton />
        </div>
      </div>
    </div>
  );
}
