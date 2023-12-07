import { useContext } from "react";
import { SearchBreedsContext } from "../context/SearchBreedsContext";
import BackButton from "./BackButton";
import { SearchResult } from "../types/types";


const Favorites = () => {

    const {favoriteResults} = useContext(SearchBreedsContext)
  return (
    <div>
        <BackButton/>
    <div className="search-page">
      <div>
        {favoriteResults.length === 0 ? <h1>No Favorites Selected!</h1>: <h1>Total Favorite Pets: {favoriteResults.length}</h1>}
      </div>
      <div className="search-results">
      {favoriteResults.map((result: SearchResult, index: number) => (
        <div key={index} className="search-result-item">
           <div className="image-container">
          <img src={result.img} alt={`Image of ${result.name}`} />
          </div>
          <div className="dog-info">
          <span className="dog-info-text">
          <div>{result.name}</div>
          <div>{result.breed}</div>
          <div>{result.age}</div>
          <div>{result.zip_code}</div>
          </span>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default Favorites;
