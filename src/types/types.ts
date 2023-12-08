import { ReactNode, SetStateAction, Dispatch } from "react";

export type SearchResult = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
};

export type LogoutProps = {
  name: string;
  email: string;
};

export type favoriteResults = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
};

export type queryParamProps = {
  breeds?: string;
  ageMin?: number;
  ageMax?: number;
};

export interface AppProviderProps {
  children: ReactNode;
}

export interface SearchBreedsTypeContext {
  favoriteResults: string[];
  setFavoriteResults: Dispatch<SetStateAction<string[]>>;
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  petNames: string[];
  setPetNames: Dispatch<SetStateAction<string[]>>;
  search: string[];
  setSearch: Dispatch<SetStateAction<string[]>>;
  searchResults: string[];
  setSearchResults: Dispatch<SetStateAction<string[]>>;
  totalBreeds: string[];
  setBreeds: Dispatch<SetStateAction<string[]>>;
  breedType: string;
  setBreedType: Dispatch<SetStateAction<string>>;
  selectedBreed: string;
  setSelectedBreed: Dispatch<SetStateAction<string>>;
  suggestedBreeds: string[];
  setSuggestedBreeds: Dispatch<SetStateAction<string[]>>;
  ageMin: number;
  setAgeMin: Dispatch<SetStateAction<number>>;
  ageMax: number;
  setAgeMax: Dispatch<SetStateAction<number>>;
  category: boolean;
  setCategory: Dispatch<SetStateAction<boolean>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  petsPerPage: number;
  lastIndex: number;
  firstIndex: number;
  pets: string[];
  totalPages: number;
  numbers: number[];
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}
