import { SearchBreedsContextProvider } from "./SearchBreedsContext";

const AppProvider = ({ children }) => {
  return <SearchBreedsContextProvider>{children}</SearchBreedsContextProvider>;
};

export default AppProvider;
