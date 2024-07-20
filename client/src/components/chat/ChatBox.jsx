import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import styled from 'styled-components';

// Styled components for the chat box
const ChatContainer = styled(Stack)`
  width: 50%;
  height: 100%;
  background: #2c2c2c; /* Dark background */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background: #1f1f1f; /* Slightly lighter background */
  color: #ffffff;
  padding: 1rem;
  border-bottom: 1px solid #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

const MessagesContainer = styled(Stack)`
  width:auto;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #2c2c2c; /* Dark background for messages */
  color: #e0e0e0; /* Light text color */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none;  /* Hide scrollbar for Internet Explorer and Edge */
  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }
`;

const Message = styled.div`
  background: ${({ isSelf }) => (isSelf ? '#4a4a4a' : '#3c3c3c')}; /* Different color for self and others */
  border-radius: 12px;
  padding: 0.75rem 1rem;
  max-width: 80%; /* Limit the width to 80% of the container */
  margin-bottom: 0.5rem;
  align-self: ${({ isSelf }) => (isSelf ? 'flex-end' : 'flex-start')}; /* Align based on sender */
  position: relative;
  word-wrap: break-word;
  display: inline-block; /* Allows for text wrapping and proper alignment */
`;

const MessageFooter = styled.span`
  font-size: 0.75rem;
  color: #aaa;
  display: block;
  margin-top: 0.5rem;
  text-align: right;
`;

const ChatInput = styled(Stack)`
  padding: 1rem;
  border-top: 1px solid #333;
  background: #1f1f1f;
  align-items: center;
  flex-direction: row;
`;

const SendButton = styled.button`
  background: #4a4a4a;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
  &:hover {
    background: #6a6a6a;
  }
`;

function ChatBox() {
  const containerRef = useRef(null)
  const { user } = useContext(AuthContext);
  const { currentChat, userMessages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  }, [textMessage, user, currentChat, sendTextMessage, setTextMessage]);

  useEffect(() => {
    // Optional side effects or logging
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [userMessages]);

  if (!recipientUser) return <p style={{ width: "100%", textAlign: "center", color: "#aaa" }}>No Conversation selected Yet .......</p>;

  if (isMessagesLoading) return <p style={{ width: "100%", textAlign: "center", color: "#aaa" }}>Loading Chat .......</p>;

  return (
    <ChatContainer >
      <ChatHeader>{recipientUser?.name}</ChatHeader>
      <MessagesContainer gap={3} ref={containerRef}>
        {userMessages && userMessages.map((message, index) => (
          <Message key={index} isSelf={message?.senderId === user?._id}>
            <span>{message.text}</span>
            <MessageFooter>{moment(message.createdAt).calendar()}</MessageFooter>
          </Message>
        ))}
      </MessagesContainer>
      <ChatInput direction="horizontal" gap={2}>
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="Nunito"
          borderColor="rgba(72, 112, 223, 0.2)"
          placeholder="Type a message..."
          onKeyDown={handleKeyDown}
        />
        <SendButton onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
          Send
        </SendButton>
      </ChatInput>
    </ChatContainer>
  );
}

export default ChatBox;
