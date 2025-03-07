// import getAccess from "@/helpers/getAccess";
// import useAuth from "@/helpers/useAuth";
// import axios from "axios";

// export default function ListContainer() {
// async function getTopArtists() {
//   const accessToken = getAccess();
//   if (accessToken) {
//     try {
//       const response = await axios.get(
//         "https://api.spotify.com/v1/me/top/artists",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(response.data.items);
//       return response.data.items; // Optionally return the data
//     } catch (error) {
//       console.error("Error fetching top artists:", error);
//       throw error; // Re-throw the error to be handled by the caller, if needed
//     }
//   }
// }
// getTopArtists();
//   return (
//     <div className="rounded-md border-4 border-[#EEBB36] bg-colors-customYellow m-5">
//       <p>List of Songs</p>
//     </div>
//   );
// }

// #EEBB36
