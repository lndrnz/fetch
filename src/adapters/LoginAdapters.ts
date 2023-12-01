import { ChangeEvent, FormEvent } from "react";
import axios from "axios";

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  setField: (value: string) => void
) => {
  setField(e.target.value);
};

export const submitFunction = async (name: string, email: string) => {
  const apiUrl = import.meta.env.VITE_LOGIN;
  const body = {
    name: name,
    email: email,
  };
  console.log(body);
  try {
    const response = await axios.post(apiUrl, body, { withCredentials: true });
    console.log(response.headers);
    return response.data;
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
};

export const handleSubmit = async (
  e: FormEvent,
  name: string,
  email: string,
  navigate: any
) => {
  e.preventDefault();

  try {
    const response = await submitFunction(name, email);
    if (response) {
      navigate("/search");
      window.location.reload();
      localStorage.setItem("isLoggedIn", true.toString());
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
