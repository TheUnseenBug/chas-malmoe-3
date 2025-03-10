import React, { useState, useEffect } from "react";

// Definiera en typ för den aktuella låten (du kan utöka den efter behov)
interface Track {
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

interface PlayerProps {
  accessToken: string;
  trackUri?: string; // Om du vill spela en specifik låt direkt
}

const Player: React.FC<PlayerProps> = ({ accessToken, trackUri }) => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Funktion för att starta uppspelning av en specifik låt via Spotify Web API
  const playTrackOnDevice = async (device_id: string, trackUri: string) => {
    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            uris: [trackUri],
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    // Definiera callbacken innan SDK-scriptet laddas
    window.onSpotifyWebPlaybackSDKReady = () => {
      const playerInstance = new window.Spotify.Player({
        name: "My Custom Spotify Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(playerInstance);

      // Lyssna på "ready"-eventet för att få Device ID
      playerInstance.addListener("ready", ({ device_id }) => {
        console.log("Spotify Player is ready with Device ID", device_id);
        setDeviceId(device_id);
        // Om en trackUri skickats in så startar vi uppspelning
        if (trackUri) {
          playTrackOnDevice(device_id, trackUri);
        }
      });

      playerInstance.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Lyssna på förändringar i uppspelningsstatusen
      playerInstance.addListener("player_state_changed", (state) => {
        if (!state) return;
        setIsPaused(state.paused);
        setCurrentTrack(state.track_window.current_track);
      });

      // Lyssna på event för felhantering
      playerInstance.addListener("initialization_error", ({ message }) => {
        console.error("Initialization Error:", message);
      });
      playerInstance.addListener("authentication_error", ({ message }) => {
        console.error("Authentication Error:", message);
      });
      playerInstance.addListener("account_error", ({ message }) => {
        console.error("Account Error:", message);
      });

      // Anslut spelaren till Spotify
      playerInstance.connect();
    };

    // Dynamiskt ladda in Spotify Web Playback SDK-scriptet om det inte redan finns
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    // Rensa upp genom att koppla ifrån spelaren när komponenten unmountas
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken, trackUri]);

  // Handler för att toggla play/pause via SDK:ets metod
  const handleTogglePlay = async () => {
    if (player) {
      await player.togglePlay();
    }
  };

  // Handler för att spela föregående låt
  const handlePreviousTrack = async () => {
    if (player) {
      await player.previousTrack();
    }
  };

  // Handler för att spela nästa låt
  const handleNextTrack = async () => {
    if (player) {
      await player.nextTrack();
    }
  };

  return (
    <div className="player-container p-6 rounded-md border-4 border-black bg-colors-customYellow m-5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-3/4">
      <div className="now-playing flex flex-row place-content-between max-w-1/2">
        {currentTrack ? (
          <>
            <div className="border-black border-4 rounded-md bg-colors-customPink m-5 p-6 text-left max-w-1/2">
              <img
                src={currentTrack.album.images[0]?.url}
                alt={currentTrack.name}
                style={{ width: 60, height: 60 }}
              />
            </div>
            <div>
              <h3>{currentTrack.name}</h3>
              <p>
                {currentTrack.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </>
        ) : (
          <p>No song is playing at the moment :(</p>
        )}
      </div>
      <div className="controls">
        <button onClick={handlePreviousTrack}>Previous</button>
        <button onClick={handleTogglePlay}>{isPaused ? "Play" : "Paus"}</button>
        <button onClick={handleNextTrack}>Next</button>
      </div>
    </div>
  );
};

export default Player;
