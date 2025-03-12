import useAccessStore from "@/store/store";
import axios from "axios";
import ArtistList from "./ArtistList";
import { useState, useEffect } from "react";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

export default function ListContainer() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const accessToken = useAccessStore().accessToken;

  useEffect(() => {
  async function getTopArtists() {
    // const accessToken = useAccessStore().accessToken;

    console.log(accessToken);
    if (accessToken) {
      try {
        const response = await axios.get<{ items: Artist[] }>(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.items);
        setArtists(response.data.items);
        // return response.data.items; // Optionally return the data
      } catch (error) {
        console.error("Error fetching top artists:", error);
        throw error; // Re-throw the error to be handled by the caller, if needed
      }
    }
  }
  
    getTopArtists();
  },[accessToken])

  return (
    <div className="rounded-md border-4 border-black bg-colors-customYellow m-2 p-4 w-1/2">
       <h2 className="text-lg font-bold mb-4 bg-colors-customYellow">Top Artists</h2>
       <ArtistList artists={artists} />
    </div>
  );
}

// #EEBB36
