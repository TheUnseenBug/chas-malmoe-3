import { Slider } from "@radix-ui/react-slider";

export default function PlayerComponent() {
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <h2>Favourite Song</h2>
        <h3>Billie Holiday</h3>
        <p>Album Name</p>
        <button>Previous</button>
        <button>Play/Pause</button>
        <button>Next</button>
        <Slider defaultValue={[33]} max={100} step={1} />
        <Slider defaultValue={[33]} max={100} step={1} />
      </div>
    </div>
  );
}
