import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function SignIn() {
  return (
    <main>
      <div className="bg-white grid-cols-8">
        <h2>Sign in with your Spotify account</h2>
        <Input placeholder="E-mail or username..."></Input>
        <Input placeholder="Password..." type="password"></Input>
        <Button>Sign in</Button>
        <p>
          You need a Spotify account and subscription to proceed. Get it{" "}
          <a href="https://www.spotify.com/se/signup" target="_blank">
            here
          </a>
          .
        </p>
      </div>
    </main>
  );
}
