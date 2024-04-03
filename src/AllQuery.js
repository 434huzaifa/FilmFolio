import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export const useAllMovies = () => {
  const caxios = useAxios();
  return useQuery({
    queryKey: ["AllMovies"],
    queryFn: async () => {
      const res = await caxios.get("/movie/");
      return res.data;
    },
  });
};



export const useMovieSearch=(query)=>{
    const caxios=useAxios();
    return useQuery({
        queryKey:['movieSearch',query],
        queryFn:async ()=>{
            const res= await caxios.get(`/movie/search/?query=${query}`)
            return res.data
        },
        gcTime:0
    })
}

