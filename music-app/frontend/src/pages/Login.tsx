const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;

export default function Login() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: "100vh" }}
    >
      <button
        className="border-black border-4 text-green px-8 py-4 bg-colors-customGreen hover:bg-colors-customBlue hover:text-white rounded-md text-3xl font-semibold"
        onClick={() => window.location.assign(AUTH_URL)}
      >
        Log in with Spotify
      </button>
    </div>
  );
}
