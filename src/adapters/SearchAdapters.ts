import axios from "axios";
import { queryParamProps } from "../types/types";

//Takes Search Inputs, creates Search URL, and makes get request of IDs
export const searchFunction = async (
  breedType?: string,
  ageMin?: string,
  ageMax?: string
) => {
  const apiUrl = import.meta.env.VITE_SEARCH;
  const queryParams: queryParamProps = {
    breeds: breedType,
    ageMin: ageMin,
    ageMax: ageMax,
  };
  const filteredParams = Object.entries(queryParams).filter(
    ([_, value]) => value !== undefined && value !== ""
  );
  const addedParams = new URLSearchParams(filteredParams).toString();
  const filteredURL = `${apiUrl}${addedParams}`;
  try {
    const response = await axios.get(filteredURL, { withCredentials: true });
    console.log("test search",response.data.resultIds)
    return response.data.resultIds;
  } catch (error) {
    console.log("search failed!", error);
    return "";
  }
};

// Makes post request with Search IDs to get dog info
export const getSearch = async (search: string[]) => {
  const apiUrl = import.meta.env.VITE_SEARCH_RESULTS;
  try {
    const response = await axios.post(apiUrl, search, {
      withCredentials: true,
    })
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("Search results failed!", error);
  }
};
