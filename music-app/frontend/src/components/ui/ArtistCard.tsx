import React, { FC } from "react";
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
        images: string;
        name: string;
        release_date: string;
      };
      artists: {
        name: string;
      };
      duration_ms: number;
      name: string;
      uri: string;
    }[];
  };
};

const ArtistCard: FC<Props> = ({ artist }) => {
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
            <Card>
              <CardHeader>
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>Duration: {track.duration_ms}</CardDescription>
                <CardDescription>
                  Album: {track.album.name} ({track.album.release_date})
                </CardDescription>
                <CardDescription>Artist: {track.artists.name}</CardDescription>
                <CardDescription>
                  <a href={track.uri}>Listen on Spotify</a>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ArtistCard;
