<<<<<<< HEAD
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="p-5">
      <Link to="/">
        <h1 className="text-white text-left text-5xl">
          daara<span className="text-pink-500">.</span>
        </h1>
      </Link>
=======
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
>>>>>>> 9f1480d1f9ed52ff49a14ba0b23d5eb1f2a4948d
    </header>
  );
}
