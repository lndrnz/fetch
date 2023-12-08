import { useContext } from "react";
import { SearchBreedsContext } from "../context/SearchBreedsContext";
import BackButton from "./BackButton";
import { SearchResult } from "../types/types";

const Favorites = () => {
  const { favoriteResults } = useContext(SearchBreedsContext);
  return (
    <div>
      <div style={{ width: "100vw", display: "flex", justifyContent: "right" }}>
        <BackButton />
      </div>
      <div className="search-page">
        <div>
          {favoriteResults.length === 0 ? (
            <h1>No Pets Selected!</h1>
          ) : (
            <h1>Total Favorite Pets: {favoriteResults.length}</h1>
          )}
        </div>
        <div className="search-results">
          {favoriteResults.map((result: SearchResult, index: number) => (
            <div className="favorite">
              <div key={index} className="search-result-item">
                <div className="image-container">
                  <img
                    className="search-result-item-image"
                    src={result.img}
                    alt={`Image of ${result.name}`}
                  />
                </div>
                <div className="dog-info">
                  <span className="dog-info-text">
                    <div>{result.name}</div>
                    <div>{result.breed}</div>
                    <div>Age: {result.age}</div>
                    <div>ZIP: {result.zip_code}</div>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
