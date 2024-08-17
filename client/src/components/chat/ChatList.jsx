import { Stack } from "react-bootstrap"
import styled from 'styled-components';
import UserChat from "./UserChat"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../css/test.css"

const NoChatsMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #aaa; /* Lighter grey text */
`;

function ChatList({userChats , isUserChatLoading , updateCurrentChat , handleAIChatSelect}) {

    const { user } = useContext(AuthContext);


    

  return (
    <Stack style={{width:"50%", position:"relative"}}>
      {
        userChats?.length < 1 ? 
          <NoChatsMessage>Start a new Chat...</NoChatsMessage> :
          <>
            {isUserChatLoading && <p>Loading Chats...</p>}
            {userChats?.map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)} style={{ cursor: 'pointer' }}>
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </>
      }
      <div className="button-86" onClick={()=>handleAIChatSelect()}>Chat with AI</div>
      </Stack>
  )
}

export default ChatList