import { api } from "./axios";

export const updateProfile = (data) => {
  return api.patch("/user/me?update_profile=true", data);
};