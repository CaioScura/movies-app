import MovieList from "./components/MovieList";
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/700.css'; // Bold 
import TvList from "./components/TvList";


export default function Home() {
  return (
    <div>
      <MovieList />

      <TvList />
      
    </div>
  );
}
