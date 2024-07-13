import { useEffect, useState } from "react"
import { baseURL, getRequest } from "../utils/services"

export const useFetchRecipientUser = (chat , user) => {
    const [recipientUser , setRecipientUser] = useState(null)
    const [ setError] = useState(null)
    
    const recipientId = chat?.members.find((id)=> id !== user?._id)
    
    
    useEffect(()=>{
        const getUser = async() => {
            if(!recipientId) return null
            const response = await getRequest(`${baseURL}/users/find/${recipientId}`)


            if(response.error){
                console.log(response)
                return setError(response)
            }

            setRecipientUser(response)

        }

        getUser()
    },[])


    return { recipientUser }
}