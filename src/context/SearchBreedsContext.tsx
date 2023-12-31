import { createContext, useState } from "react";
import { AppProviderProps } from "../types/types";
import { SearchBreedsTypeContext } from "../types/types";

export const SearchBreedsContext = createContext<SearchBreedsTypeContext | null>(null);

const SearchBreedsContextProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  const [favoriteResults, setFavoriteResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [petNames, setPetNames] = useState<string[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [totalBreeds, setBreeds] = useState<string[]>([]);
  const [breedType, setBreedType] = useState<string>("");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [suggestedBreeds, setSuggestedBreeds] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [category, setCategory] = useState<boolean>(true);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const petsPerPage: number = 6;
  const lastIndex: number = currentPage * petsPerPage;
  const firstIndex: number = lastIndex - petsPerPage;
  const pets = searchResults.slice(firstIndex, lastIndex);
  const totalPages: number = Math.ceil(searchResults.length / petsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
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
        currentPage,
        setCurrentPage,
        petsPerPage,
        lastIndex,
        firstIndex,
        pets,
        totalPages,
        numbers,
        name,
        setName,
        email,
        setEmail
      }}
    >
      {children}
    </SearchBreedsContext.Provider>
  );
};

export { SearchBreedsContextProvider };
