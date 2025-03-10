import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Home from "../pages/Home";
import Player from "../pages/Player";
import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";
import ArtistPage from "../pages/ArtistPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "player",
        element: <Player />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "artist/:id",
        element: <ArtistPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
