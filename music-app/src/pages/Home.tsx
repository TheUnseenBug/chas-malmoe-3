import ListContainer from "@/components/ui/listContainer";
import Header from "@/components/layouts/Header";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <>
      <Header />
      <h1>Search for a song</h1>
      <SearchBar />
      <ListContainer />
    </>

  );
}
