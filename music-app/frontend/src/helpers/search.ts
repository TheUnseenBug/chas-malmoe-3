// import { spotifyToken } from "./spotifyHelper";

// export const searchSpotify = async (query: string) => {
//   const searchUrl = `https://api.spotify.com/v1/search?q=${query}&type=track`;

//   await fetch(searchUrl, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + (await spotifyToken()),
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };
