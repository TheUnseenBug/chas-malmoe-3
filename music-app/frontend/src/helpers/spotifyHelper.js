// const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// export const spotifyToken = async () => {
//   const url = "https://accounts.spotify.com/api/token";
//   const authOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
//     },
//     body: "grant_type=client_credentials",
//   };

//   const tokenResponse = await fetch(url, authOptions);
//   const tokenData = await tokenResponse.json();
//   const accessToken = tokenData.access_token;

//   return accessToken;
// }
