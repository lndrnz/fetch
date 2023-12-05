import axios from "axios";

export const logoutFunction = async (
  name: string,
  email: string,
  navigate: any
) => {
  const apiUrl = import.meta.env.VITE_LOGOUT;
  const body = {
    name: name,
    email: email,
  };
  try {
    const response = await axios.post(apiUrl, body, { withCredentials: true });
    navigate("/");
    return response;
  } catch (error) {
    console.error("An error occurred during logout:", error);
    localStorage.setItem("isLoggedIn", false.toString());
  }
};
