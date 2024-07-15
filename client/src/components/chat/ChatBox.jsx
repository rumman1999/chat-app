// import React from 'react'

import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function ChatBox() {
    const {user} = useContext(AuthContext)
    
  return (
    <div>ChatBox</div>
  )
}

export default ChatBox