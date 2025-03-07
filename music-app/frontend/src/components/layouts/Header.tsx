import Login from "@/pages/Login";
import { Link } from "react-router";
export default function Header() {
  return (
    <header className="p-3">
      <h1 className="text-white text-left text-5xl">
        <Link to="/">
          daara<span className="text-pink-500">.</span>
        </Link>
        <Login />
      </h1>
    </header>
  );
}
