import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"

function PotentialChat() {
    const {potentialChats , createChat , onlineUsers} = useContext(ChatContext)
    const {user} = useContext(AuthContext)

    // console.log("potentialChats" , potentialChats)
    
  return (
    <div className="all-users">
        {
            potentialChats && potentialChats.map((u , index)=> (
                <div className="single-user" key={index} onClick={()=>createChat(user._id , u._id)}>
                    {u.name}
                    <span className={onlineUsers?.some((user)=>user?.userId ===u?._id) ? "user-online" : ""}></span>
                </div>
            ))
        }
    </div>
  )
}

export default PotentialChat