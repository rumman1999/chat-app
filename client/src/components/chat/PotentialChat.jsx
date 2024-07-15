import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"

function PotentialChat() {
    const {potentialChats , createChat} = useContext(ChatContext)
    const {user} = useContext(AuthContext)

    // console.log("potentialChats" , potentialChats)
    
  return (
    <div className="all-users">
        {
            potentialChats && potentialChats.map((u , index)=> (
                <div className="single-user" key={index} onClick={()=>createChat(user._id , u._id)}>
                    {u.name}
                    <span className="user-online"></span>
                </div>
            ))
        }
    </div>
  )
}

export default PotentialChat