import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

const useAppwrite = (fn:() => Promise<any[]>) => {
    const [data,setData] = useState<any[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    
    const fetchData = async()=>{
   setIsLoading(true);
   
   try{
   const response = await fn();
   setData(response)
   }catch(err: any){
   console.log(err)
   Alert.alert('Error', err.message)
   setIsLoading(false);
   
   }finally{
     setIsLoading(false);
   }
    }
    useEffect(() => {
    
     fetchData()
    }, [])

const refetch = () => fetchData();

    return {data,refetch,isLoading}
    
}

export default useAppwrite;