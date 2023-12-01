import { useState, useEffect, ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBreedsContext } from "../context/SearchBreedsContext";
import { searchFunction, getSearch } from "../adapters/SearchAdapters";
import { getBreeds } from "../adapters/BreedsAdapters";
import { SearchResult } from "../types/types";
import { handleZip } from "../adapters/LocationAdapters";
import Favorites from "./Favorites";

const SearchBreeds = () => {
  const [search, setSearch] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [totalBreeds, setBreeds] = useState<string[]>([]);
  const [breedType, setBreedType] = useState<string>("");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [suggestedBreeds, setSuggestedBreeds] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(20);
  const [category, setCategory] = useState<boolean>(true);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const navigate = useNavigate();


  const { favoriteResults, setFavoriteResults, favorites, setFavorites, petNames, setPetNames} = useContext(SearchBreedsContext)



  console.log(favoriteResults);
  const handleFavoriteClick = (petId: string[], petName: string[]) => {
    if (favorites.includes(petId)) {
      setFavorites(favorites.filter((id) => id !== petId));

    } else {
      setFavorites([...favorites, petId]);
      setPetNames([...petNames, petName])
    }
  };
  const handleFavorites = async () => {
    const response = await getSearch(favorites);
    if (response) {
      console.log()
      setFavoriteResults(response);
      navigate("/favorites")
    } else {
      console.log("getSearch Failed!");
      setFavoriteResults([]);
    }
  };

  console.log("favorites list lol", favorites);
  //Handles Search Input
  const handleSearch = async (
    e: FormEvent,
    breedType: string,
    ageMin: number,
    ageMax: number
  ) => {
    e.preventDefault();

    try {
      const response = await searchFunction(breedType, ageMin, ageMax);
      if (response) {
        setSearch(response);
      }
    } catch (error) {
      console.log("searchFunction failed!", error);
    }
  };

  //Gets All Breeds
  const handlegetBreeds = async () => {
    const response = await getBreeds();
    if (response) {
      setBreeds(response);
    } else {
      console.log("getBreeds Failed!");
      setBreeds([]);
    }
  };

  //Gets Breeds on render
  useEffect(() => {
    handlegetBreeds();
  }, []);

  //Handles input search changes
  const handleBreedChange = (
    e: ChangeEvent<HTMLInputElement>,
    setField: (value: any) => void
  ) => {
    setField(e.target.value);

    if (e.target.value.trim() !== "") {
      const filteredBreeds = totalBreeds.filter((breed) =>
        breed.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setSuggestedBreeds(filteredBreeds);
    } else if (e.target.value === "") {
      setSuggestedBreeds([]);
    }
  };

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement>,
    setField: (value: any) => void
  ) => {
    setField(e.target.value);
  };

  const handleLocationSearch = async (
    e: FormEvent,
    city?: string,
    state?: string
  ) => {
    e.preventDefault();

    try {
      const response = await handleZip(city, state);
      if (response) {
        console.log("handleLocation went through");
        setSearch(response);
      }
    } catch (error) {
      console.log("handleLocation failed!", error);
    }
  };

  // Places Search Results in array
  const handlegetSearch = async () => {
    const response = await getSearch(search);
    if (response) {
      setSearchResults(response);
    } else {
      console.log("getSearch Failed!");
      setSearchResults([]);
    }
  };

  useEffect(() => {
    console.log(favorites)
    handlegetSearch();
  }, [search]);

  return (
    <div className="search-page">
      <h1>Your Favorite Pets: {petNames.join(", ")}!</h1>
      <div>
        <h1>Search by {category ? "Breed" : "Location"}</h1>
        <button onClick={() => setCategory(!category)}>Switch Search</button>
      </div>
      {category ? (
        <div>
          <form
            style={{ display: "flex" }}
            onSubmit={(e) => handleSearch(e, breedType, ageMin, ageMax)}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                name="name"
                value={breedType}
                placeholder="breed"
                onChange={(e) => handleBreedChange(e, setBreedType)}
              />
              <select
                value={selectedBreed}
                onChange={(e) => handleBreedChange(e, setBreedType)}
              >
                <option value="">Select a breed...</option>

                {suggestedBreeds.map((breed, index) => (
                  <option key={index} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="minage"
              value={ageMin}
              placeholder="Minimum Age"
              onChange={(e) => handleSearchChange(e, setAgeMin)}
            />
            <input
              type="text"
              name="maxage"
              value={ageMax}
              placeholder="Maximum Age"
              onChange={(e) => handleSearchChange(e, setAgeMax)}
            />
            {/* size of results, from?, sort asc|desc*/}
            <button type="submit">Search</button>
          </form>
          <button onClick={handleFavorites}>
          Show Favorites</button>

          <h1>Search Results {searchResults.length}</h1>
          {searchResults.map((result, index) => (
            <div key={index}>
              <img src={result.img} alt={`Image of ${result.name}`} />
              <div>{result.name}</div>
              <div>{result.breed}</div>
              <div>{result.age}</div>
              <div>{result.zip_code}</div>
              <button onClick={() => handleFavoriteClick(result.id, result.name)}>
                {favorites.includes(result.id) ? "Unfavorite" : "Favorite"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <form
            style={{ display: "flex" }}
            onSubmit={(e) => handleLocationSearch(e, city, state)}
          >
            <input
              type="text"
              name="city"
              value={city}
              placeholder="city"
              onChange={(e) => handleSearchChange(e, setCity)}
            />
            <input
              type="text"
              name="state"
              value={state}
              placeholder="state"
              onChange={(e) => handleSearchChange(e, setState)}
            />
            <button type="submit">Search</button>
          </form>
          <button onClick={handleFavorites}>
          Show Favorites</button>
          <h1>Search Results {searchResults.length}</h1>
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <div className="image-container">
                <img src={result.img} alt={`Image of ${result.name}`} />
                </div>
                <div className="dog-info">
                  <span className="dog-info-text">
                    <p>{result.name}</p>
                    <p>{result.breed}</p>
                    <p>Age: {result.age}</p>
                    <p>ZIP: {result.zip_code}</p>
                  </span>
                  <button
                    className="favorite-button"
                    onClick={() => handleFavoriteClick(result.id)}
                  >
                    {favorites.includes(result.id) ? "Unfavorite" : "Favorite"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBreeds;
