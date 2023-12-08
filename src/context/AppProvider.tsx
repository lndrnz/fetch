import { AppProviderProps } from "../types/types";
import { SearchBreedsContextProvider } from "./SearchBreedsContext";

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <SearchBreedsContextProvider>{children}</SearchBreedsContextProvider>;
};

export default AppProvider;
