import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";
import ArtistId from "@/pages/ArtistId";
import Player from "@/pages/Player";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Player",
    element: <Player />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/artist/:id",
    element: <ArtistId />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
