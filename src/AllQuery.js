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

export const useSingleMovie = (id) => {
  const caxios = useAxios();
  return useQuery({
    queryKey: ["singleMovie",id],
    queryFn: async () => {
      const res = await caxios.get(`/movie/${id}`);
      return res.data;
    },
    gcTime:0
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

export const useConfirmUser=(email,password)=>{
    const caxios=useAxios()
    return useQuery({
        queryKey:[email],
        queryFn:async ()=>{
            const res= await caxios.get(`/user/?email=${email}&password=${password}`)
            return res.data
        }
    })
}