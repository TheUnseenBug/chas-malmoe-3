import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";
import useAccessStore from "@/store/store";
import useAuth from "@/helpers/useAuth";

export default function Home() {
  const code = new URLSearchParams(window.location.search).get("code");
  useAuth();
  const token = useAccessStore();
  console.log(token);
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
