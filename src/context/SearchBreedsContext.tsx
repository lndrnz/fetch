import { ContextType, createContext, useState } from "react";

const SearchBreedsContext = createContext<ContextType | undefined>(undefined);

const SearchBreedsContextProvider = ({ children }) => {
  const [favoriteResults, setFavoriteResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [petNames, setPetNames] = useState<string[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [totalBreeds, setBreeds] = useState<string[]>([]);
  const [breedType, setBreedType] = useState<string>("");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [suggestedBreeds, setSuggestedBreeds] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(20);
  const [category, setCategory] = useState<boolean>(true);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  return (
    <SearchBreedsContext.Provider
      value={{
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
        setSelectedBreed,
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
      }}
    >
      {children}
    </SearchBreedsContext.Provider>
  );
};

export { SearchBreedsContext, SearchBreedsContextProvider };
