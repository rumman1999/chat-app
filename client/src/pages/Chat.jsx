import { useContext, useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChat from "../components/chat/PotentialChat";
import ChatBox from "../components/chat/ChatBox";
import styled from 'styled-components';
import "../index.css";
import { ChatContext } from "../context/ChatContext";

// Styled Components
const ChatContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #1e1e1e; /* Dark background */
  color: #e0e0e0; /* Light text color */
`;

const ChatSidebar = styled.div`
  width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
  transition: width 0.3s ease;
  overflow: hidden;
  border-left: 1px solid #333; /* Dark border */
  background: #2c2c2c; /* Slightly lighter dark background for sidebar */
  max-height: calc(100vh - 56px); /* Adjust based on header height */
  box-shadow: ${({ isOpen }) => isOpen ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none'};
  z-index: 1000; /* High z-index to ensure it is above other content */
  position: absolute; /* Position absolute to overlay on the right side */
  right: 0;
  top: 6px; /* Adjust based on header height */
  height: calc(100vh - 56px); /* Adjust height based on header height */

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    border-left: none;
    border-bottom: 1px solid #333;
  }
`;

const MessagesBox = styled(Stack)`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #1e1e1e; /* Dark background for messages */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Darker shadow */
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ChatHeader = styled.div`
  background: #333; /* Darker background for header */
  color: #fff; /* Light text color */
  padding: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
`;

const NoChatsMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #aaa; /* Lighter grey text */
`;

const ToggleButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #333;
  border: none;
  color: #fff;
  z-index: 1001; /* Ensure it is above the sidebar */
  
  &:hover {
    background: #444;
  }
`;

function Chat() {
  const { userChats, isUserChatLoading, updateCurrentChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <ChatContainer>
      <ChatHeader>
        Chat Application
        <ToggleButton onClick={toggleSidebar}>
          {sidebarOpen ? 'Hide Potential Chats' : 'Show Potential Chats'}
        </ToggleButton>
      </ChatHeader>
      <Stack direction="horizontal" style={{ height: 'calc(100vh - 56px)', position: 'relative' }}>
        <ChatSidebar isOpen={sidebarOpen} direction="vertical" gap={3} className="align-items-start">
          <PotentialChat />
        </ChatSidebar>
        <MessagesBox className="flex-grow-1 pe-3" style={{
          display:"flex",
          flexDirection:"row"
        }}>
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
          <ChatBox />
        </MessagesBox>
      </Stack>
    </ChatContainer>
  );
}

export default Chat;
