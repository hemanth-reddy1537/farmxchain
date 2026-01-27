import API from "../api/api";

// LOGIN
export const loginUser = (data) => {
  return API.post("/users/login", data);
};

// REGISTER
export const registerUser = (data) => {
  return API.post("/users/register", data);
};
