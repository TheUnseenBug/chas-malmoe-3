import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import searchSpotify from "../helpers/searchSpotify";
import useAccessStore from "@/store/store";
import SongList from "./ui/SongList";
import ArtistList from "./ui/ArtistList";

interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SearchResults {
  tracks: {
    items: SpotifyTrack[];
  };
  artists: {
    items: SpotifyArtist[];
  };
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    tracks: { items: [] },
    artists: { items: [] },
  });
  const accessToken = useAccessStore().accessToken;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      async function performSearch() {
        if (searchTerm && accessToken) {
          const results = await searchSpotify(searchTerm, accessToken);
          setSearchResults(results);

          console.log("Top 5 song results:", formattedSongs);
          console.log("Top 5 artist results:", formattedArtists);
        } else {
          setSearchResults({ tracks: { items: [] }, artists: { items: [] } });
        }
      }

      performSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, accessToken]);

  const formattedSongs = searchResults.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    images: track.album.images,
  }));

  const formattedArtists = searchResults.artists.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    images: artist.images,
  }));

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="placeholder:text-white"
      />

      {searchTerm && (
        <div className="flex gap-4">
          <div className="rounded-md border-4 border-black bg-colors-customYellow m-2 p-4 w-1/2">
            <h2 className="text-lg font-bold mb-4 bg-colors-customYellow">
              Search Results: Artists
            </h2>
            <ArtistList artists={formattedArtists} />
          </div>

          <div className="rounded-md border-4 border-black bg-colors-customGreen m-2 p-4 w-1/2">
            <h2 className="text-lg font-bold mb-4 bg-colors-customGreen">
              Search Results: Songs
            </h2>
            <SongList songs={formattedSongs} />
          </div>
        </div>
      )}
    </div>
  );
}
