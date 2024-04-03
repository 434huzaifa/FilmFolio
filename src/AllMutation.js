import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";
import toast from "react-hot-toast";
import { useAllMovies } from "./AllQuery";


export const useCreateMovie = () => {
  const caxios = useAxios();
  const user=JSON.parse(localStorage.getItem("user"))
  const queryAllMovie=useAllMovies(user.id)
  return useMutation({
    mutationFn: async ({name,genre,rating,release_date}) => {
        const res = await caxios.post("/movie/",{name,genre,rating,release_date})
        return res.data
    },
    onSuccess:()=>{
        queryAllMovie.refetch()
        toast.success("Movie data inserted")
    },
    onError:()=>{
        toast.error("Movie insert failed")
    }
  });
};
export const useSingleMovie = (user_id) => {
  const caxios = useAxios();
  return useMutation({
    mutationFn: async (id) => {
      const res = await caxios.get(`/movie/${id}/?user_id=${user_id}`);
      return res.data;
    },
    
  });
};
export const useConfirmUser=()=>{
    const caxios=useAxios()
    return useMutation({
        mutationFn:async ({email,password})=>{
            const res= await caxios.get(`/user/?email=${email}&password=${password}`)
            return res.data
        },
        onSuccess:(data)=>{
            toast.success("User found")
            localStorage.setItem("user",JSON.stringify(data))
        },
        onError:()=>{
            toast.error("User not found")
        }
    })
}
export const useCreateRating=()=>{
    const caxios=useAxios()
    const user=JSON.parse(localStorage.getItem("user"))
    const userQueryAllMovie=useAllMovies(user.id,false)
    return useMutation({
        mutationFn:async({user_id,movie_id,rating})=>{
            const res= await caxios.post("/rating/",{user_id,movie_id,rating})
            return res.data
        },
        onSuccess:()=>{
            userQueryAllMovie.refetch()
            toast.success("Movie Rated")
        },
        onError:()=>{
            toast.error("Movie Rated failed")
        }
    })
}

export const useSingleReact=()=>{
    const caxios=useAxios()
    return useMutation({
        mutationFn:async (id)=>{
            const res = await caxios.get(`/rating/${id}/`)
            return res.data
        }
    })
}

export const useMovieSearch=()=>{
    const caxios=useAxios();
    const user=JSON.parse(localStorage.getItem("user"))
    return useMutation({
        mutationFn:async (query)=>{
            const res= await caxios.get(`/movie/search/?query=${query}&user_id=${user.id}`)
            return res.data
        },
        retry:0
    })
}
