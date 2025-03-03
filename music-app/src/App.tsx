import { RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/Header";

import router from "./router/Router";

function App() {
  return (
    <>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
