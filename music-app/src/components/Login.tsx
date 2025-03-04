const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fae1e3e260a143af9c18375a7d23142f&response_type=code&redirect_uri=http://localhost:5175&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div className="flex justify-center content-center items-center">
      <a href={AUTH_URL}>Login</a>
    </div>
  );
}
