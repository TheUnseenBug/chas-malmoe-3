import useAuth from "@/helpers/useAuth";
import axios from "axios";

export default function ListContainer() {
  function getCodeFromUrl(url: string) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("code");
  }
  const code = getCodeFromUrl(window.location.href);
  const accessToken = useAuth(code);
  console.log(accessToken);
  async function getTopArtists() {
    if (accessToken) {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        return response.data; // Optionally return the data
      } catch (error) {
        console.error("Error fetching top artists:", error);
        throw error; // Re-throw the error to be handled by the caller, if needed
      }
    }
  }
  getTopArtists();
  return (
    <div className="rounded-md border-4 border-[#EEBB36] bg-colors-customYellow m-5">
      <p>List of Songs</p>
    </div>
  );
}

// #EEBB36
