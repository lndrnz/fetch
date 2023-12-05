import axios from "axios";

//Gets Breeds from API
export const getBreeds = async () => {
  const apiUrl = import.meta.env.VITE_BREEDS;
  const headers = {
    withCredentials: true,
  };
  try {
    const response = await axios.get(apiUrl, headers);
    return response.data;
  } catch (error) {
    console.log("Can't get Breed List", error);
    return [];
  }
};
