import {  createContext, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { baseURL, getRequest, postRequest } from "../utils/services";


export const ChatContext = createContext();

export const ChatContextProvider = ({children , user}) => {
    // console.log(user)

    const [userChats , setUserChats] = useState(null)
    const [isUserChatLoading , setIsUserChatLoading] =  useState(false)
    const [userChatsError , setUserChatError] = useState(null)
    const [potentialChats , setPotentialChats] = useState([])
    const [currentChat , setCurrentChat] = useState(null)

    const [userMessages , setUserMessages] = useState(null);
    const [isUserMessagesLoading , setIsMessagesLoading] = useState(false);
    const [messageError , setMessageError] = useState(null);


    console.log("userMessages",userMessages)
 
    useEffect(()=>{
        const getUser = async() => {
            // console.count("first")

            const response = await getRequest(`${baseURL}/users/getUsers`)
             
                if(response.error){
                    console.log("Error fetching users " , response);
                    return setUserChatError(response)
                }
                const pChats = response.filter((u)=>{
                    let isChatCreated = false
                    

                    // console.log(user._id === u._id);
                    if(user?._id === u?._id) return false
                    
                    if(userChats){
                        isChatCreated = userChats?.some((chat)=>{
                            return chat.members[0] === u._id || chat.members[1] === u._id
                        })
                    }

                    return !isChatCreated
                })

                setPotentialChats(pChats)
        }
        getUser()
    },[])

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

    useEffect(()=>{

        const getUserMessages = async() => {
            setIsMessagesLoading(true)
            setMessageError(null)
                const response = await getRequest(`${baseURL}/message/${currentChat?._id}`)
                
                setIsMessagesLoading(false)
                if(response.error){
                    return setUserChatError(response)
                }
                
                setUserMessages(response)
            }
        getUserMessages()

    },[currentChat])

    const createChat = useCallback(async(firstId , secondId) => {
        const response = await postRequest(`${baseURL}/chats` , JSON.stringify({
            firstId , secondId
        }))
        if(response.error){
            return console.log("Error fetching chat" , response)
        }

        setUserChats(prev => [...prev , response])
    },[])

    const updateCurrentChat = useCallback((chat)=>{
        // console.log(chat)
        setCurrentChat(chat)
    } ,[])

    return(<ChatContext.Provider value={{
        userChats , setUserChats,
        userChatsError , isUserChatLoading,
        potentialChats , createChat , updateCurrentChat , userMessages , isUserMessagesLoading , messageError
    }}>
        {children}
    </ChatContext.Provider>)
}

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    user : PropTypes.object
};