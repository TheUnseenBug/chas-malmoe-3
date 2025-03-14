import { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/playerStore";
import useAccessStore from "@/store/store.ts";
import axios from "axios";

const PlayerComponent = () => {
  const { accessToken } = useAccessStore();
  const { trackUri, isPlaying, deviceId, setDeviceId, togglePlay } =
    usePlayerStore();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  // 🔹 Lägg till denna för att se när `trackUri` ändras
  useEffect(() => {
    console.log("🎵 Current track URI from Zustand:", trackUri);
    try {
      axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          uris: [trackUri], // Spotify track URIs to play (array)
          device_id: deviceId, // Optional: Specify the device to play on
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Playback started successfully.");
    } catch (error) {
      console.error("Error starting playback:", error);
    }
  }, [trackUri]); // Logga varje gång `trackUri` ändras

  useEffect(() => {
    if (!accessToken) return;

    console.log("Initializing Spotify Web Playback SDK...");

    if (window.Spotify) {
      initializePlayer();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.onload = () => initializePlayer();
    document.body.appendChild(script);
  }, [accessToken]);

  const initializePlayer = () => {
    console.log("Spotify Web Playback SDK Ready!");

    const spotifyPlayer = new window.Spotify.Player({
      name: "My Custom Spotify Player",
      getOAuthToken: (cb) => cb(accessToken),
      volume: 0.5,
    });

    setPlayer(spotifyPlayer);

    spotifyPlayer.addListener("ready", ({ device_id }) => {
      console.log("✅ Spotify Player is ready with Device ID:", device_id);
      setDeviceId(device_id);
      axios.put(
        "https://api.spotify.com/v1/me/player",
        {
          device_ids: [device_id],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    });

    spotifyPlayer.addListener("player_state_changed", (state) => {
      if (!state) return;
      console.log("🎵 Now Playing:", state.track_window.current_track);
      setCurrentTrack(state.track_window.current_track);
    });

    spotifyPlayer.connect().then((success) => {
      if (success) {
        console.log("✅ Spotify Player connected!");
      } else {
        console.error("❌ Failed to connect to Spotify Player");
      }
    });
  };

  const handlePlayPause = async () => {
    if (!player) return;
    console.log(isPlaying);
    if (isPlaying) {
      try {
        axios.put(
          "https://api.spotify.com/v1/me/player/pause",
          {
            device_id: deviceId, // Optional: Specify the device to play on
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Playback started successfully.");
      } catch (error) {
        console.error("Error starting playback:", error);
      }
      togglePlay(false);
    } else {
      try {
        axios.put(
          "https://api.spotify.com/v1/me/player/play",
          {
            uris: [trackUri], // Spotify track URIs to play (array)
            device_id: deviceId, // Optional: Specify the device to play on
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Playback started successfully.");
      } catch (error) {
        console.error("Error starting playback:", error);
      }
      togglePlay(true);
    }
  };

  return (
    <div className="player-container p-6 rounded-md border-4 border-black bg-yellow-400 m-5">
      {currentTrack ? (
        <div className="flex items-center">
          <img
            src={currentTrack.album.images[0]?.url}
            alt={currentTrack.name}
            className="w-16 h-16 mr-4"
          />
          <div>
            <h3 className="text-lg font-bold">{currentTrack.name}</h3>
            <p className="text-sm text-gray-700">
              {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <p>No song is playing...</p>
      )}
      <button
        onClick={handlePlayPause}
        className="mt-2 px-4 py-2 bg-green-500 rounded-md"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default PlayerComponent;
