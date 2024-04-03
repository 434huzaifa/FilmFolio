import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export const useAllMovies = (user_id,enable=true) => {
  const caxios = useAxios();
  return useQuery({
    queryKey: ["AllMovies"],
    queryFn: async () => {
      const res = await caxios.get(`/movie/?user_id=${user_id}`);
      return res.data;
    },
    enabled:enable
  });
};




