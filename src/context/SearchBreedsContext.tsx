import { createContext, useState } from "react";

const SearchBreedsContext = createContext();

const SearchBreedsContextProvider = ({ children }) => {
  const [favoriteResults, setFavoriteResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [petNames, setPetNames] = useState<string[]>([]);
  return (
    <SearchBreedsContext.Provider
      value={{
       favoriteResults,
       setFavoriteResults,
       favorites,
       setFavorites,
       petNames,
       setPetNames
      }}
    >
      {children}
    </SearchBreedsContext.Provider>
  );
};

export { SearchBreedsContext, SearchBreedsContextProvider };
