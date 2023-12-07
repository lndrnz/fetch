import axios from "axios";
import { SearchResult } from "../types/types";
//Gets ZipCodes by City or State
export const locationSearch = async (city?: string, state?: string) => {
  const body = {
    city: city,
    state: state,
  };
  const apiUrl = import.meta.env.VITE_LOCATION_SEARCH;

  try {
    const response = await axios.post(apiUrl, body, { withCredentials: true });
    const zipCodes = response.data.results.map((result: SearchResult) => result.zip_code);
    console.log("location search worked");
    return zipCodes;
  } catch (err) {
    console.error(err);
  }
};

const searchZipFunction = async (zip: string) => {
  const apiUrl = import.meta.env.VITE_SEARCH;
  const queryParams = {
    zipCodes: zip,
  };
  const filteredParams = Object.entries(queryParams);
  const addedParams = new URLSearchParams(filteredParams).toString();
  // console.log(addedParams)
  const filteredURL = `${apiUrl}${addedParams}`;
  try {
    const response = await axios.get(filteredURL, { withCredentials: true });
    console.log("searchZipfunction worked");
    return response.data.resultIds;
  } catch (error) {
    console.log("zip search failed!", error);
    return "";
  }
};

//After getting results with zipcodes, search dogs by their zip code to get id, then post data to get results
export const handleZip = async (city?: any, state?: any) => {
  try {
    const zip_codes = await locationSearch(city, state);
    const dog_ids = await Promise.all(
      zip_codes.map(async (zip: string) => {
        const response = await searchZipFunction(zip);
        return response;
      })
    );
    const results = [].concat(...dog_ids);
    // console.log(results)
    return results;
  } catch (err) {
    console.error(err);
  }
};
