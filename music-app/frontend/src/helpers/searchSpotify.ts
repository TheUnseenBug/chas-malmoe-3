import axios from "axios";

interface SpotifySearchResult {
  tracks: {
    items: any[];
  };
  artists: {
    items: any[];
  };
}

async function searchSpotify(
  query: string,
  accessToken: string
): Promise<SpotifySearchResult> {
  const SPOTIFY_API_URL = "https://api.spotify.com/v1/search";

  try {
    const response = await axios.get(SPOTIFY_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: "track,artist", //Lägg till mer här om ni vill
        limit: 5,
      },
    });

    return {
      tracks: response.data.tracks,
      artists: response.data.artists,
    };
  } catch (error: any) {
    console.error("Error searching Spotify:", error.message);
    return {
      tracks: { items: [] },
      artists: { items: [] },
    };
  }
}

export default searchSpotify;
