import { FC } from "react";
import { usePlayerStore } from "@/store/playerStore";
import PlayerComponent from "../PlayerComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

type Props = {
  artist: {
    name: string;
    popularity: number;
    external_urls: string;
    image: string;
    topTracks: {
      album: {
        images: { url: string }[];
        name: string;
        release_date: string;
      };
      artists: { name: string }[];
      duration_ms: number;
      name: string;
      uri: string;
    }[];
    handlePlayTrack: (uri: string) => void; // 🔹 Ta emot funktionen som en prop
  };
};

const ArtistCard: FC<Props> = ({ artist, handlePlayTrack }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{artist.name}</CardTitle>
          <CardDescription>Popularity: {artist.popularity}</CardDescription>
          <CardDescription className="flex justify-center">
            <img src={artist.image} alt="artist image" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {artist.topTracks.map((track) => (
            <Card key={track.uri}>
              <CardHeader>
                <CardTitle
                  onClick={() => handlePlayTrack(track.uri)} // 🔹 Använd `handlePlayTrack()`
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  {track.name}
                </CardTitle>
                <CardDescription>Duration: {track.duration_ms}</CardDescription>
                <CardDescription>
                  Album: {track.album.name} ({track.album.release_date})
                </CardDescription>
                <CardDescription>
                  Artist:{" "}
                  {Array.isArray(track.artists)
                    ? track.artists.map((artist) => artist.name).join(", ")
                    : track.artists.name}
                </CardDescription>
                <CardDescription>
                  <a href={track.uri}>Listen on Spotify</a>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
      <PlayerComponent />
    </>
  );
};

export default ArtistCard;
