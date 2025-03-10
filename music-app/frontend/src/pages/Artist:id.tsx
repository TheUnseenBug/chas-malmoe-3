import useAccessStore from "@/store/store";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

const ArtistId = () => {
  const accessToken = useAccessStore().accessToken;
  const location = useLocation();
  const path = location.pathname;
  const artistData = path.startsWith("/artist/") ? path.substring(8) : null;
  console.log("accessToken:", accessToken);
  console.log("artistData:", artistData);
  useEffect(() => {
    async function getTopArtists() {
      if (accessToken) {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistData}/top-tracks`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data.tracks);
          return response.data.tracks;
        } catch (error) {
          console.error("Error fetching top artists:", error);
          throw error; // Re-throw the error to be handled by the caller, if needed
        }
      }
    }

    getTopArtists();
  }, [accessToken]);
  return <div>ArtistId</div>;
};

export default ArtistId;
