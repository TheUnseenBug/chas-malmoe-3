import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import SocialIcons from "@/components/SocialButtons";

export default function SignIn() {
  return (
    <main>
      <div className="bg-white max-w-screen-lg flex-row justify-center">
        <h2>Sign in with your Spotify account</h2>
        <Input placeholder="E-mail or username..."></Input>
        <Input placeholder="Password..." type="password"></Input>
        <Button>Sign in</Button>
        <SocialIcons />
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
