import { useSearchParams } from "react-router-dom";
import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";
import useAccessStore from "@/store/store";
import useAuth from "@/helpers/useAuth";

export default function Home() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
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
