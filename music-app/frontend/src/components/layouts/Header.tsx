import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="p-5">
      <Link to="/">
        <h1 className="text-white text-left text-5xl">
          daara<span className="text-pink-500">.</span>
        </h1>
      </Link>
    </header>
  );
}
