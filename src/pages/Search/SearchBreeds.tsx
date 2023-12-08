import { useEffect, ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBreedsContext } from "../../context/SearchBreedsContext";
import { searchFunction, getSearch } from "../../adapters/SearchAdapters";
import { getBreeds } from "../../adapters/BreedsAdapters";
import { handleZip } from "../../adapters/LocationAdapters";
import { SearchResult } from "../../types/types";
import Logout from "../Logout";

const SearchBreeds = () => {
  const navigate = useNavigate();

  const {
    favoriteResults,
    setFavoriteResults,
    favorites,
    setFavorites,
    petNames,
    setPetNames,
    search,
    setSearch,
    searchResults,
    setSearchResults,
    totalBreeds,
    setBreeds,
    breedType,
    setBreedType,
    selectedBreed,
    suggestedBreeds,
    setSuggestedBreeds,
    ageMin,
    setAgeMin,
    ageMax,
    setAgeMax,
    category,
    setCategory,
    city,
    setCity,
    state,
    setState,
    currentPage,
    setCurrentPage,
    lastIndex,
    firstIndex,
    pets,
    numbers,
  } = useContext(SearchBreedsContext);

  // Adds Pets to Favorite Array and their names
  const handleFavoriteClick = (petId: string, petName: string) => {
    if (favorites.includes(petId)) {
      setFavorites(favorites.filter((id: string) => id !== petId));
    } else {
      setFavorites([...favorites, petId]);
      setPetNames([...petNames, petName]);
    }
  };

  // Makes request of favorite pets, places them in an array, and then navigates to favorites page
  const handleFavorites = async () => {
    const response = await getSearch(favorites);
    if (response) {
      console.log();
      setFavoriteResults(response);
      navigate("/favorites");
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

  //Gets All Breeds for suggested inputs
  const handlegetBreeds = async () => {
    const response = await getBreeds();
    if (response) {
      setBreeds(response);
    } else {
      console.log("getBreeds Failed!");
      setBreeds([]);
    }
  };

  //Gets All Breeds on initial render
  useEffect(() => {
    handlegetBreeds();
  }, []);

  //Handles input search changes, and suggests breeds
  const handleBreedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setField: (value: any) => void
  ) => {
    setField(e.target.value);

    if (e.target.value.trim() !== "") {
      const filteredBreeds = totalBreeds.filter((breed: string) =>
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


  // Finds Dogs based on City and State
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

  // Gets Search Results of matching Dogs and puts it in an array
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
    console.log(favorites);
    handlegetSearch();
  }, [search]);

  const prePage = () => {
    if (currentPage === 1) return null;
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    } else {
      null;
    }
  };

  const changePage = (id: number) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage === 10) return null;
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div style={{ width: "100vw", display: "flex", justifyContent: "right" }}>
        <Logout/>
      </div>
      <div className="search-page">
        <div className="search-header">
          <div className="search-header-items">
            <h1>
              Search by{" "}
              <a
                className="header-button"
                onClick={() => setCategory(!category)}
              >
                {" "}
                {category ? "Breed" : "Location"}
              </a>
            </h1>
          </div>
          <div className="search-header-items">
            <h1>
              Total{" "}
              <a className="header-button" onClick={handleFavorites}>
                Favorite Pets:
              </a>{" "}
              {petNames.length}
            </h1>
          </div>
        </div>
        {category ? (
          <div>
            <form
              className="search-bar"
              onSubmit={(e) => handleSearch(e, breedType, ageMin, ageMax)}
            >
              <div className="search-bar-breed">
                <div style={{ width: "180px", marginRight: "10px" }}>
                  <input
                    className="search-bar-breed-2"
                    type="text"
                    name="name"
                    value={breedType}
                    placeholder="breed"
                    onChange={(e) => handleBreedChange(e, setBreedType)}
                  />
                  <select
                    className="search-bar-breed-3"
                    value={selectedBreed}
                    onChange={(e) => handleBreedChange(e, setBreedType)}
                  >
                    <option value="">Select a breed...</option>

                    {suggestedBreeds.map((breed: string, index: number) => (
                      <option key={index} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <input
                className="search-bar-breed"
                type="text"
                name="minage"
                value={ageMin}
                placeholder="Minimum Age"
                onChange={(e) => handleSearchChange(e, setAgeMin)}
              />
              <input
                className="search-bar-breed"
                type="text"
                name="maxage"
                value={ageMax}
                placeholder="Maximum Age"
                onChange={(e) => handleSearchChange(e, setAgeMax)}
              />
              <button className="search-bar-button" type="submit">
                Search
              </button>
            </form>

            <h1>
              {searchResults.length !== 0
                ? `Search Results: ${searchResults.length}`
                : ""}
            </h1>
            <div className="search-results">
              {pets.map((result: SearchResult, index: number) => (
                <div
                  key={index}
                  className={
                    favorites.includes(result.id) ? "favorite" : "basic"
                  }
                >
                  <div className="search-result-item">
                    <div className="image-container">
                      <img
                        className="search-result-item-image"
                        src={result.img}
                        alt={`Image of ${result.name}`}
                      />
                    </div>
                    <div className="dog-info">
                      <span className="dog-info-text">
                        <p>{result.name}</p>
                        <p>{result.breed}</p>
                        <p>Age: {result.age}</p>
                        <p>ZIP: {result.zip_code}</p>
                      </span>
                      {favorites.includes(result.id) ? (
                        <img
                          className="star pointer"
                          src="https://i.imgur.com/9fuxfxy.png"
                          alt="Unfavorited"
                          onClick={() =>
                            handleFavoriteClick(result.id, result.name)
                          }
                        />
                      ) : (
                        <img
                          className="star pointer"
                          src="https://i.imgur.com/cecWS0L.png"
                          alt="favorited"
                          onClick={() =>
                            handleFavoriteClick(result.id, result.name)
                          }
                          title="Favorited"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex" }}>
              {searchResults.length !== 0 ? (
                <nav className="pagination">
                  <h3 className="pointer prev" onClick={() => prePage()}>
                    Prev
                  </h3>
                  <div className="page-numbers">
                    {numbers.map((number: number, index: number) => (
                      <div
                        key={index}
                        className={currentPage === number ? "selected" : ""}
                      >
                        <h4
                          className="number"
                          onClick={() => changePage(number)}
                        >
                          {number}
                        </h4>
                      </div>
                    ))}
                  </div>
                  <h3 className="pointer next" onClick={() => nextPage()}>
                    Next
                  </h3>
                </nav>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <form
              className="search-bar"
              style={{ display: "flex" }}
              onSubmit={(e) => handleLocationSearch(e, city, state)}
            >
              <input
                className="search-bar-location"
                type="text"
                name="city"
                value={city}
                placeholder="city"
                onChange={(e) => handleSearchChange(e, setCity)}
              />
              <input
                className="search-bar-location"
                type="text"
                name="state"
                value={state}
                placeholder="state"
                onChange={(e) => handleSearchChange(e, setState)}
              />
              <button className="search-bar-button" type="submit">
                Search
              </button>
            </form>
            <h1>
              {searchResults.length !== 0
                ? `Search Results: ${searchResults.length}`
                : ""}
            </h1>
            <div className="search-results">
              {pets.map((result: SearchResult, index: number) => (
                <div
                  key={index}
                  className={
                    favorites.includes(result.id) ? "favorite" : "basic"
                  }
                >
                  <div className="search-result-item">
                    <div className="image-container">
                      <img
                        className="search-result-item-image"
                        src={result.img}
                        alt={`Image of ${result.name}`}
                      />
                    </div>
                    <div className="dog-info">
                      <span className="dog-info-text">
                        <p>{result.name}</p>
                        <p>{result.breed}</p>
                        <p>Age: {result.age}</p>
                        <p>ZIP: {result.zip_code}</p>
                      </span>
                      {favorites.includes(result.id) ? (
                        <img
                          className="star pointer"
                          src="https://i.imgur.com/9fuxfxy.png"
                          alt="Unfavorited"
                          onClick={() =>
                            handleFavoriteClick(result.id, result.name)
                          }
                        />
                      ) : (
                        <img
                          className="star pointer"
                          src="https://i.imgur.com/cecWS0L.png"
                          alt="favorited"
                          onClick={() =>
                            handleFavoriteClick(result.id, result.name)
                          }
                          title="Favorited"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex" }}>
              {searchResults.length !== 0 ? (
                <nav className="pagination">
                  <h3 className="pointer prev" onClick={() => prePage()}>
                    Prev
                  </h3>
                  <div className="page-numbers">
                    {numbers.map((number: number, index: number) => (
                      <div
                        key={index}
                        className={
                          currentPage === number ? "selected pointer" : ""
                        }
                      >
                        <h4
                          className="number"
                          onClick={() => changePage(number)}
                        >
                          {number}
                        </h4>
                      </div>
                    ))}
                  </div>
                  <h3 className="pointer next" onClick={() => nextPage()}>
                    Next
                  </h3>
                </nav>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBreeds;
