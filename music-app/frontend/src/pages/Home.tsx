import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";
import useAccessStore from "@/store/store";
import useAuth from "@/helpers/useAuth";

export default function Home() {
  const code = new URLSearchParams(window.location.search).get("code");
  console.log("code:", code);
  const token = useAccessStore().accessToken;
  if (code) {
    useAuth(code);
  }

  console.log("accesstoken:", token);
  return (
    <div>
      {code ? (
        <div>
          {" "}
          <h1>Search for a song</h1>
          <SearchBar />
          <section className="flex align-middle justify-center">
            <ListContainer />{" "}
          </section>
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
