import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";
import useAccessStore from "@/store/store";
import useAuth from "@/helpers/useAuth";
import SongListContainer from "@/components/ui/SongListContainer";
import PlayerComponent from "@/components/PlayerComponent";

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
          <h1 className="text-white">Search for a song</h1>
          <SearchBar />
          <section className="p-2 flex align-middle justify-center flex-col md:flex-row lg:flex-row">
            <ListContainer /> <SongListContainer />{" "}
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
