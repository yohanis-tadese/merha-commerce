import axios from "axios";
import { backendUrl } from "./BackendURL";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${backendUrl}/users/admin`, {
      email,
      password,
    });

    if (response.data.token) {
      return { token: response.data.token, message: response.data.message };
    } else {
      throw new Error("Token is not found or invalid token.");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something wrond. please try again.");
    }
  }
};
