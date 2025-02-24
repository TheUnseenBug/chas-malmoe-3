import "./App.css";
import CardOne from "./components/CardOne";
import Footer from "./components/Footer";
import Page from "./components/Pagination";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <section className="flex flex-wrap content-center justify-center">
        <CardOne />
        <CardOne />
        <CardOne />
        <CardOne />
      </section>
      <Page />
      <Footer />
    </>
  );
}

export default App;
