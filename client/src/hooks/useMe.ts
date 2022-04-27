import { useQuery } from "react-query";
import api from "../utils/api";

const getMe = async () => {
  const { data } = await api.get(`/users/me`);
  return data.data;
};

export const useMe = () =>
  useQuery(["me"], getMe, {
    staleTime: 0,
  });
