import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";

export default function Home() {
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <div>
      {code ? (
        <div>
          {" "}
          <h1>Search for a song</h1>
          <SearchBar />
          <ListContainer />{" "}
        </div>
      ) : (
        <div>
          {" "}
          <Login />{" "}
        </div>
      )}
    </div>
  );
}
