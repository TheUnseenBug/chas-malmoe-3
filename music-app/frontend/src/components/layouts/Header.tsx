import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-3">
      <h1 className="text-white text-left text-5xl">
        <NavLink
          to="/"
          className="cursor-pointer hover:text-gray-300 transition-colors"
        >
          daara
        </NavLink>
        <span className="text-pink-500">.</span>
      </h1>
    </header>
  );
}
