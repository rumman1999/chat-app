// import React from 'react'

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import {Stack} from "react-bootstrap"
import moment from "moment"
import InputEmoji from "react-input-emoji"

function ChatBox() {
    const {user} = useContext(AuthContext)
    const {currentChat , userMessages , isMessagesLoading , sendTextMessage} = useContext(ChatContext)
    const {recipientUser} = useFetchRecipientUser(currentChat , user)
    const [textMessage , settextMessage] = useState("") 
    // console.log("text" , textMessage)



    useEffect(()=>{
      // console.log(currentChat , user , recipientUser)

    },[ userMessages])

    if(!recipientUser) return (
      <p style={{
        textAlign:"center" 
      }}>
        No Converstaion selected Yet .......
      </p>
    )

    if(isMessagesLoading) return (
      <p style={{
        textAlign:"center" 
      }}>
        Loading Chat .......
      </p>
    )


  return (
    <Stack gap={4} className="chat-box">
    <div className="chat-header">
      <strong>{recipientUser?.name}</strong>
    </div>
    <Stack gap={3} className="messages">
      {
        userMessages && userMessages.map((message, index) => (
          <Stack key={index} className={message?.senderId === user?._id ? 
            "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}>
            <span>{message.text}</span>
            <span className="message-footer">{moment(message.createdAt).calendar()}</span>
          </Stack>
        ))
      }
    </Stack>
    <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
      <InputEmoji value={textMessage} onChange={settextMessage} fontFamily="nunito" borderColor="rgba(72, 112, 223, 0.2"/>
      <button className="send-btn" onClick={()=>sendTextMessage(textMessage , user , currentChat._id , settextMessage)}>snd</button>
    </Stack>
  </Stack>
  
  )
}

export default ChatBox