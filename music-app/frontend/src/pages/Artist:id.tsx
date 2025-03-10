import useAccessStore from "@/store/store";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

const ArtistId = () => {
  const location = useLocation();
  const path = location.pathname;
  const artistData = path.startsWith("/artist/") ? path.substring(8) : null;
  const accessToken = useAccessStore().accessToken;
  console.log("accessToken:", accessToken);

  useEffect(() => {
    async function getTopTracks() {
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
    async function getArtistInfo() {
      if (accessToken) {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistData}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error("Error fetching top artists:", error);
          throw error; // Re-throw the error to be handled by the caller, if needed
        }
      }
    }

    getTopTracks();
    getArtistInfo();
  }, [accessToken]);
  return <div>ArtistId</div>;
};

export default ArtistId;
