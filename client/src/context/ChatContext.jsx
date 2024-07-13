import {  createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { baseURL, getRequest } from "../utils/services";


export const ChatContext = createContext();

export const ChatContextProvider = ({children , user}) => {
    // console.log(user)

    const [userChats , setUserChats] = useState(null)
    const [isUserChatLoading , setIsUserChatLoading] =  useState(false)
    const [userChatsError , setUserChatError] = useState(null)
    const [potentialChats , setPotentialChats] = useState([])

    useEffect(()=>{
        const getUserChats = async() => {
            // console.log("response  user" , user)
            setIsUserChatLoading(true)
            setUserChatError(null)
            if(user?._id){
                const response = await getRequest(`${baseURL}/chats/${user?._id}`)
                
                setIsUserChatLoading(false)
                if(response.error){
                    console.log(response);
                    return setUserChatError(response)
                }
                
                // console.log("response chat of user" , response)
                setUserChats(response)
            }
        }
        getUserChats()
    },[user])

    return(<ChatContext.Provider value={{
        userChats , setUserChats,
        userChatsError , isUserChatLoading
    }}>
        {children}
    </ChatContext.Provider>)
}

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    user : PropTypes.object
};