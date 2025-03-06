const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: "100vh" }}
    >
      <button
        className=" text-white px-5 py-2.5 bg-green-500"
        onClick={() => window.location.assign(AUTH_URL)}
      >
        Login With Spotify
      </button>
    </div>
  );
}
