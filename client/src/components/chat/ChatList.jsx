import { Stack } from "react-bootstrap"
import styled from 'styled-components';
import UserChat from "./UserChat"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NoChatsMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #aaa; /* Lighter grey text */
`;

function ChatList({userChats , isUserChatLoading , updateCurrentChat}) {

    const { user } = useContext(AuthContext);

  return (
    <Stack style={{width:"50%"}}>{
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
      }</Stack>
  )
}

export default ChatList