import { useContext } from "react";
import { SearchBreedsContext } from "../context/SearchBreedsContext";
import BackButton from "./BackButton";


const Favorites = () => {

    const {favoriteResults} = useContext(SearchBreedsContext)
  return (
    <div>
        <BackButton/>
      <div>
        <h1>Favorite Results {favoriteResults.length}</h1>
        {/* <button onClick={() => setFavs(!showFavs)}>Hide</button> */}
      </div>
      {favoriteResults.map((result, index) => (
        <div key={index}>
          <img src={result.img} alt={`Image of ${result.name}`} />
          <div>{result.name}</div>
          <div>{result.breed}</div>
          <div>{result.age}</div>
          <div>{result.zip_code}</div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
