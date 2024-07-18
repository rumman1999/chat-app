import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { Container, Stack } from "react-bootstrap"
import UserChat from "../components/chat/UserChat"
import { AuthContext } from "../context/AuthContext"
import PotentialChat from "../components/chat/PotentialChat"
import "../index.css"
import ChatBox from "../components/chat/ChatBox"

function Chat() {
  const {userChats , isUserChatLoading  , updateCurrentChat} = useContext(ChatContext)
  const {user} = useContext(AuthContext)
  // console.log(userChats)
  return (
    <Container>
    <PotentialChat />
    <Stack direction="horizontal">
      {
        userChats?.length < 1 ? <>Start a new Chat....</> :
        <Stack direction="vertical" gap={4} className="align-items-start">
          {
            isUserChatLoading && <p>Loading Chats</p>
          }
          {
            userChats?.map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserChat chat={chat} user={user} />
              </div>
            ))
          }
        </Stack>
      }
      <Stack className="messages-box flex-grow-1 pe-3" gap={3}>
        <ChatBox />
      </Stack>
    </Stack>
  </Container>
  
  )
}

export default Chat