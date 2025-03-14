import useAccessStore from "@/store/store";
import { NavLink } from "react-router-dom";

export default function Header() {
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  return (
    <header className="p-3 ">
      <h1 className="text-white text-left text-5xl">
        <NavLink
          to="/"
          className="cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out"
        >
          daara
          <span className="text-pink-500">.</span>
        </NavLink>
      </h1>
      <button
        className="bg-black text-white py-1.5 px-3 rounded-md "
        onClick={() => addAccessToken(null)}
      >
        Log out
      </button>
    </header>
  );
}
