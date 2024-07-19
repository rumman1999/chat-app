import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import styled from 'styled-components';

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #1f1f1f;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  height:100%
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: #2c2c2c;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }

  span {
    margin-left: auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ online }) => online ? '#4caf50' : '#f44336'};
  }
`;

function PotentialChat() {
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <ChatList>
      {potentialChats && potentialChats.map((u, index) => {
        const online = onlineUsers?.some((onlineUser) => onlineUser?.userId === u?._id);
        return (
          <ChatItem key={index} onClick={() => createChat(user._id, u._id)} online={online}>
            {u.name}
            <span className={online ? "user-online" : ""}></span>
          </ChatItem>
        );
      })}
    </ChatList>
  );
}

export default PotentialChat;
