import{Navigate} from "react-router"
export const ProtectedRoute=({children,auth=false})=>{
    const token=localStorage.getItem("access_token")
    if(!token){
        if(auth){
            return children
        }else{
         return <Navigate to={"/"}/>
        }
    }else{
        if(auth){
            return <Navigate to={"/courses"}/>
        }else{
            return children
        }
    }
} 