import API from "../api/api";

export const fetchAllUsers = () =>
  API.get("/users/all-with-passwords");

export const updateUserRole = (id, role) =>
  API.put(`/users/${id}/role`, { role });

export const deleteUser = (id) =>
  API.delete(`/users/${id}`);
export const fetchAdminStats = () =>
  API.get("/users/all-with-passwords");
