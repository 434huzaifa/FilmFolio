import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";
import toast from "react-hot-toast";


export const useCreateMovie = () => {
  const caxios = useAxios();
  return useMutation({
    mutationFn: async ({name,genre,rating,release_date}) => {
        const res = await caxios.post("/movie/",{name,genre,rating,release_date})
        return res.data
    },
    onSuccess:()=>{
        toast.success("Movie data inserted")
    },
    onError:()=>{
        toast.error("Movie insert failed")
    }
  });
};
export const useSingleMovie = () => {
  const caxios = useAxios();
  return useMutation({
    mutationFn: async (id) => {
      const res = await caxios.get(`/movie/${id}`);
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
    return useMutation({
        mutationFn:async({user_id,movie_id,rating})=>{
            const res= await caxios.post("/rating/",{user_id,movie_id,rating})
            return res.data
        },
        onSuccess:()=>{
            toast.success("Movie data inserted")
        },
        onError:()=>{
            toast.error("Movie insert failed")
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
