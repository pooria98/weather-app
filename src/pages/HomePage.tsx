import SavedList from "../components/SavedList";
import Search from "../components/Search";

const HomePage = () => {
  return (
    <div className="py-4 px-2 max-w-xl w-full mx-auto flex flex-col h-full">
      <Search />
      <SavedList />
    </div>
  );
};

export default HomePage;
