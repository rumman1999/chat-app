import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { Container, Stack } from "react-bootstrap"
import UserChat from "../components/UserChat"
import { AuthContext } from "../context/AuthContext"

function Chat() {
  const {userChats , isUserChatLoading } = useContext(ChatContext)
  const {user} = useContext(AuthContext)
  // console.log(userChats)
  return (
    <Container>
      {
        userChats?.length < 1 ? <>Start a new Chat....</> : 
        <Stack direction="horizontal" gap={4} className="align-items-start">
          {
            isUserChatLoading && <p>Loading Chats</p>
          }
          {
            userChats?.map((chat , index)=>(
              <div key={index}>
                <UserChat chat={chat} user={user}/>
              </div>
            ))
          }
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>ChatBox</Stack>
        </Stack>
       }
    </Container>
  )
}

export default Chat