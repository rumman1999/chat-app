import {  createContext, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { baseURL, getRequest, postRequest } from "../utils/services";
import  { io } from "socket.io-client"


export const ChatContext = createContext();

export const ChatContextProvider = ({children , user}) => {
    // console.log(user)
    const [chatWithAI , setChatWithAI] = useState(false)

    const [userChats , setUserChats] = useState([])
    const [isUserChatLoading , setIsUserChatLoading] =  useState(false)
    const [userChatsError , setUserChatError] = useState(null)
    const [potentialChats , setPotentialChats] = useState([])
    const [currentChat , setCurrentChat] = useState(null)

    const [userMessages , setUserMessages] = useState(null);
    const [isUserMessagesLoading , setIsMessagesLoading] = useState(false);
    const [messageError , setMessageError] = useState(null);
    const [sendTextMessageError , setSendTextMessageError] = useState(null)
    const[newMessage , setNewMessage] = useState('')

    const [socket , setSocket ] = useState(null)
    const [onlineUsers , setOnlineUsers] = useState([])

      const handleAIChatSelect = useCallback(()=>{
        // console.log("clicked true ai ")
        setChatWithAI(true)
    } ,[])


    // console.log(userChats)
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
    //initializing socket
    useEffect(()=>{
        const newSocket = io("https://chat-app-scket.onrender.com");
        setSocket(newSocket)

        return () => {
            newSocket.disconnect();
        }
    },[user])

    useEffect(()=>{
        if(socket === null) return
        // console.log(user?._id)
        socket.emit("addNewUser" , user?._id)
        socket.on("getOnlineUser" , (res)=>{
            setOnlineUsers(res)
        })
    },[socket])

    //send message 
    useEffect(() => {
        if (socket === null || !newMessage) return;
        const recipientId = currentChat?.members.find((id) => id !== user?._id);
        socket.emit("sendMessage", { ...newMessage, recipientId });
        setNewMessage(''); // Reset newMessage after sending
    }, [newMessage, socket, currentChat, user]);
    

    // //recieve message 
    useEffect(() => {
        if (socket === null) return;
    
        socket.on("getMessage", (res) => {
            if (currentChat?._id !== res.chatId) return;
            setUserMessages(prev => [...prev, res]);
        });
    
        return () => {
            socket.off("getMessage");
        };
    }, [socket, currentChat]);
    
 
    useEffect(()=>{
        
        getUser()
        getUserChats()
    },[])

    useEffect(()=>{
        
        getUserChats()
    },[user])

    useEffect(()=>{

        
        getUserMessages()

    },[currentChat])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseURL}/chats`, JSON.stringify({
            firstId, secondId
        }));
        console.log("response", response, "userChats", userChats);
    
        if (response.error) {
            return console.log("Error creating chat", response);
        }
    
        // Assuming response contains the created chat object with an id
        if (userChats && userChats.some(chat => chat._id === response._id)) {
            console.log("Chat already exists");
        } else {
            if (userChats) {
                setUserChats(prev => [...prev, response]);
            } else {
                setUserChats([response]);
            }
        }
    }, [userChats]);
    

    const updateCurrentChat = useCallback((chat)=>{
        // console.log(chat)
        setChatWithAI(false)
        setCurrentChat(chat)
    } ,[])


    const sendTextMessage = useCallback(async(textMessage , sender , currentChatId , setTextMessage)=> {
        if(!textMessage) return console.log("You must type something....");

        const response =await postRequest(`${baseURL}/message` , JSON.stringify({
            chatId : currentChatId,
            senderId :sender._id,
            text : textMessage
        }))

        if(response.error){
            return setSendTextMessageError(response)
        }

        setNewMessage(response)
        setUserMessages(prev => [...prev ,response])
        setTextMessage("")
        
    }, [])

    return(<ChatContext.Provider value={{
        userChats , setUserChats,
        userChatsError , isUserChatLoading,
        potentialChats , createChat ,currentChat, updateCurrentChat , userMessages , isUserMessagesLoading , 
        messageError,sendTextMessage,onlineUsers,sendTextMessageError,
        chatWithAI , handleAIChatSelect
    }}>
        {children}
    </ChatContext.Provider>)
}

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    user : PropTypes.object
};