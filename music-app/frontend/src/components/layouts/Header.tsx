import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAccessStore from "@/store/store";
import { NavLink } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const Header: React.FC = () => {
  // Hämta funktion för att uppdatera access token
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  const accessToken = useAccessStore((state) => state.accessToken);
  const navigate = useNavigate();
  // State för att kontrollera om utloggningsmodalen är öppen
  const [shouldCancel, setShouldCancel] = useState(false);

  // Öppna utloggningsmodalen
  const handleLogout = () => {
    setShouldCancel(true);
  };

  // Hantera bekräftad utloggning
  const confirmLogout = () => {
    addAccessToken("");
    setShouldCancel(false);
    navigate("/");
  };

  return (
    <header className="p-3 flex justify-between align-middle ml-10 mr-10">
      <h1 className="text-white text-left text-5xl">
        <NavLink
          to="/"
          className="cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out"
        >
          dara
          <span className="text-pink-500">.</span>
        </NavLink>
      </h1>

      {shouldCancel && accessToken && (
        <div className="flex flex-col-reverse md:flex-row justify-center gap-2">
          <button
            onClick={confirmLogout}
            className="border-4 border-black bg-red-500 hover:opacity-80 text-black py-1.5 px-3 rounded-md transition-opacity duration-200 ease-in-out"
          >
            Logout
          </button>
          <button
            onClick={() => setShouldCancel(false)}
            className="border-4 border-black bg-white hover:opacity-80 text-black py-1.5 px-3 rounded-md transition-opacity duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      )}
      {!shouldCancel && accessToken && (
        <button
          className="border-4 border-black bg-white hover:opacity-80 text-black py-1.5 px-3 rounded-md transition-opacity duration-200 ease-in-out"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </header>
  );
};

export default Header;
