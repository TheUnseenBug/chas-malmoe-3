import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-3">
      <h1 className="text-white text-left text-5xl">
        <NavLink
          to="/"
          className="cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out"
        >
          daara
          <span className="text-pink-500">.</span>
        </NavLink>
      </h1>
    </header>
  );
}
