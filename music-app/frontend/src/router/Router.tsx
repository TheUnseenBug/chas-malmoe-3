import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Player from "../pages/Player";
import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";
import ArtistPage from "../pages/ArtistPage";

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
    element: <ArtistPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
