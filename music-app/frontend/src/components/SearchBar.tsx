import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <div className="w-full max-w-md">
      <Input type="text" placeholder="Search for a song..." className="p-2" />
    </div>
  );
}
